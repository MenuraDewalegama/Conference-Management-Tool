/*
@author : Dhanusha Perera
@date : 29/06/2021
*/

const router = require('./conference-post-v2.route').router;
const conferencePostV2Route = require('./conference-post-v2.route');
const conferencePostV2API = require('../api/conference-post-v2.api');
const commonValidation = require('./validation/common.validation');
const keySpeakerValidation = require('./validation/key-speakers.validation');
const keySpeakerAPI = require('../api/key-speaker.api');

// http://localhost:3000/api/v2/conferences/{60b102411ebcec35400d3d12}/keyspeakers

router.get('/:conferencePostID/keyspeakers', async (ctx) => {
    const conferencePostID = ctx.params.conferencePostID;
    try {
        const validationResult = await conferencePostV2Route.validateConferencePostID(conferencePostID, ctx);
    } catch (errorMessage) {
        console.error(errorMessage);
        return;
    }

    try {
        /* if matching record is found. let's continue retrieving; key-speakers records from DB. */
        const conferencePost = await _getConferencePostByID(conferencePostID, ctx);
        if (!conferencePost) {
            /* no matching conference post found. */
            ctx.response.status = 404;
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }

    /* Retrieve key-speakers from DB. */
    try {
        const result = await keySpeakerAPI.getAllKeySpeakers(conferencePostID);
        if (result) {
            ctx.response.type = 'application/json';
            ctx.response.status = 200;
            ctx.response.body = result;
        }
    } catch (error) {
        ctx.response.status = 500;
    }
});

router.get('/:conferencePostID/keyspeakers/:keySpeakerID', async (ctx) => {
    const conferencePostID = ctx.params?.conferencePostID;
    const keySpeakerID = ctx.params?.keySpeakerID;

    /* Validate ConferencePostID. */
    try {
        const validationResult = await conferencePostV2Route.validateConferencePostID(conferencePostID, ctx);
    } catch (errorMessage) {
        console.error(errorMessage);
        ctx.response.status = 400;
        ctx.response.body = errorMessage;
        return;
    }

    /* Validate KeySpeakerID. */
    try {
        const validationResult = await _validateKeySpeakerID(keySpeakerID, ctx);
    } catch (errorMessage) {
        console.error(errorMessage);
        ctx.response.status = 400;
        ctx.response.body = errorMessage;
        return;
    }

    try {
        /* if matching record is found. let's continue retrieving; key-speakers records from DB. */
        const conferencePost = await _getConferencePostByID(conferencePostID, ctx);
        if (!conferencePost) {
            /* no matching conference post found. */
            ctx.response.status = 404;
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }

    /* Retrieve key-speaker by ID from DB. */
    try {
        const result = await keySpeakerAPI.getKeySpeakerByID(keySpeakerID);
        if (result) {
            ctx.response.type = 'application/json';
            ctx.response.status = 200;
            ctx.response.body = result;
        } else {
            /* No matching record found. */
            ctx.response.status = 404;
        }
    } catch (error) {
        ctx.response.status = 500;
    }

});

router.post('/:conferencePostID/keyspeakers', async (ctx) => {
    const conferencePostID = ctx.params?.conferencePostID;
    const keySpeakerBody = ctx.request.body;

    /* Validate ConferencePostID. */
    try {
        const validationResult = await conferencePostV2Route.validateConferencePostID(conferencePostID, ctx);
    } catch (errorMessage) {
        console.error(errorMessage);
        ctx.response.status = 400;
        ctx.response.body = errorMessage;
        return;
    }

    /* check for the content content type. */
    if (ctx.request.type !== 'multipart/form-data') {
        /* send BAD REQUEST */
        ctx.response.type = 'text/plain';
        ctx.response.status = 400;
        ctx.response.body = `Invalid Content-Type: Content-Type should be multipart/form-data`;
        return;
    }

    /* keySpeakerImage validation. */
    if (ctx.request.files.hasOwnProperty('keySpeakerImage') && ctx.request.files?.keySpeakerImage?.size === 0) {
        /* send BAD REQUEST */
        ctx.response.type = 'text/plain';
        ctx.response.status = 400;
        ctx.response.body = `keySpeakerImage is required. keySpeakerImage should be uploaded.`;
        return;
    }

    /* checks for the keySpeaker details errors. */
    let keySpeakerDetails;
    try {
        keySpeakerDetails = JSON.parse(keySpeakerBody?.keySpeakerDetails);
    } catch (error) {
        ctx.response.status = 400;
        return;
    }

    /* validate keySpeakerDetails input. */
    try {
        const errorMessages = await keySpeakerValidation.validateKeySpeaker(keySpeakerDetails);

        if (errorMessages.length !== 0) {
            /* send BAD REQUEST */
            ctx.response.type = 'text/plain';
            ctx.response.status = 400;
            ctx.response.body = errorMessages;
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }


    /* save the key-speaker. */
    try {
        /* add the conference post. */
        const result = await keySpeakerAPI.saveKeySpeaker(conferencePostID, {
            conferencePostID: conferencePostID,
            name: keySpeakerDetails.name,
            title: keySpeakerDetails.title,
            description: keySpeakerDetails.description,
            keySpeakerImageURI: null, // keySpeakerImageURI
            createdDate: new Date(Date.now()).toISOString(),
            updatedDate: null
        }, ctx.request.files);

        if (result.code === 201) {
            ctx.response.type = 'application/json';
            ctx.response.status = 201;
            ctx.response.body = {
                'generatedId': result.message
            };
        }

    } catch (error) {
        if (error?.code && !isNaN(error?.code)) {
            ctx.response.status = error?.code;
            ctx.response.body = error?.message;
        } else {
            ctx.response.status = 500; // internal server error.
        }
        console.error(error);
    }


});

router.put('/:conferencePostID/keyspeakers/:keySpeakerID', async (ctx) => {
    const conferencePostID = ctx.params?.conferencePostID;
    const keySpeakerID = ctx.params?.keySpeakerID;
    /* get request body data. */
    const keySpeakerBody = ctx.request.body;
    let conferencePostDBRecord;
    let keySpeakerDBRecord;

    /* Validate ConferencePostID. */
    try {
        const validationResult = await conferencePostV2Route.validateConferencePostID(conferencePostID, ctx);
    } catch (errorMessage) {
        console.error(errorMessage);
        ctx.response.status = 400;
        ctx.response.body = errorMessage;
        return;
    }

    /* Validate KeySpeakerID. */
    try {
        const validationResult = await _validateKeySpeakerID(keySpeakerID, ctx);
    } catch (errorMessage) {
        console.error(errorMessage);
        ctx.response.status = 400;
        ctx.response.body = errorMessage;
        return;
    }

    /* Check for the content content type. */
    if (ctx.request.type !== 'multipart/form-data') {
        /* send BAD REQUEST */
        ctx.response.type = 'text/plain';
        ctx.response.status = 400;
        ctx.response.body = `Invalid Content-Type: Content-Type should be multipart/form-data`;
        return;
    }

    try {
        /* check for the matching ConferencePost record.
        if matching record is found. store the retrieve record in conferencePostDBRecord variable. */
        conferencePostDBRecord = await _getConferencePostByID(conferencePostID, ctx);
        if (!conferencePostDBRecord) {
            /* no matching conference post found. */
            ctx.response.status = 404;
            ctx.response.body = `Not Found: ConferencePost for ID: ${keySpeakerID}`;
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }

    try {
        /* check for the matching KeySpeaker record.
        if matching record is found, store it in keySpeakerDBRecord variable.  */
        keySpeakerDBRecord = await keySpeakerAPI.getKeySpeakerByID(keySpeakerID);
        if (!keySpeakerDBRecord) {
            /* no matching conference post found. */
            ctx.response.status = 404;
            ctx.response.body = `Not Found: KeySpeaker for ID: ${keySpeakerID}`;
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }

    /* checks for the keySpeaker details errors. */
    const keySpeakerDetails = JSON.parse(keySpeakerBody?.keySpeakerDetails);
    /*  validate keySpeakerDetails input. */
    try {
        const errorMessages = await keySpeakerValidation.validateKeySpeaker(keySpeakerDetails);

        if (errorMessages.length !== 0) {
            /* send BAD REQUEST */
            ctx.response.type = 'text/plain';
            ctx.response.status = 400;
            ctx.response.body = errorMessages;
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }


    /* update the key-speaker. */
    try {
        /* add the conference post. */
        const result = await keySpeakerAPI.updateKeySpeaker(keySpeakerID, {
                conferencePostID: keySpeakerDBRecord.conferencePostID,
                name: keySpeakerDetails.name,
                title: keySpeakerDetails.title,
                description: keySpeakerDetails.description,
                createdDate: keySpeakerDBRecord.createdDate, // keySpeaker record createdDate
                updatedDate: new Date(Date.now()).toISOString()
            }, ctx.request.files,
            keySpeakerDBRecord);

        if (result.code === 204) {
            ctx.response.status = 204;
        }

    } catch (error) {
        if (error?.code && !isNaN(error?.code)) {
            ctx.response.status = error?.code;
            ctx.response.body = error?.message;
        } else {
            ctx.response.status = 500; // internal server error.
        }
        console.error(error);
    }

    //update-end
});

router.del('/:conferencePostID/keyspeakers/:keySpeakerID', async (ctx) => {
    const conferencePostID = ctx.params?.conferencePostID;
    const keySpeakerID = ctx.params?.keySpeakerID;
    /* get request body data. */
    const keySpeakerBody = ctx.request.body;
    let conferencePostDBRecord;
    let keySpeakerDBRecord;

    /* Validate ConferencePostID. */
    try {
        const validationResult = await conferencePostV2Route.validateConferencePostID(conferencePostID, ctx);
    } catch (errorMessage) {
        console.error(errorMessage);
        ctx.response.status = 400;
        ctx.response.body = errorMessage;
        return;
    }

    /* Validate KeySpeakerID. */
    try {
        const validationResult = await _validateKeySpeakerID(keySpeakerID, ctx);
    } catch (errorMessage) {
        console.error(errorMessage);
        ctx.response.status = 400;
        ctx.response.body = errorMessage;
        return;
    }

    try {
        /* check for the matching ConferencePost record.
        if matching record is found. store the retrieve record in conferencePostDBRecord variable. */
        conferencePostDBRecord = await _getConferencePostByID(conferencePostID, ctx);
        if (!conferencePostDBRecord) {
            /* no matching conference post found. */
            ctx.response.status = 404;
            ctx.response.body = `Not Found: ConferencePost for ID: ${keySpeakerID}`;
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }

    try {
        /* check for the matching KeySpeaker record.
        if matching record is found, store it in keySpeakerDBRecord variable.  */
        keySpeakerDBRecord = await keySpeakerAPI.getKeySpeakerByID(keySpeakerID);
        if (!keySpeakerDBRecord) {
            /* no matching conference post found. */
            ctx.response.status = 404;
            ctx.response.body = `Not Found: KeySpeaker for ID: ${keySpeakerID}`;
            return;
        }
    } catch (error) {
        console.error(error);
        return;
    }

    try {
        const result = await keySpeakerAPI.deleteKeySpeakerByID(keySpeakerID, keySpeakerDBRecord);
        if (result?.deletedCount === 1) {
            /* record delete successfully. */
            ctx.response.status = 204;
        } else {
            /* something went wrong with delete operation. */
            ctx.response.status = 500;
        }
    } catch (error) {
        ctx.response.status = 500;
        console.error(error);
    }


});


/* Retrieve ConferencePost by ConferencePostID. */
_getConferencePostByID = (conferencePostID, ctx) => {
    return new Promise((resolve, reject) => {
        try {
            const conferencePost = conferencePostV2API.getConferencePostByID(conferencePostID);

            if (conferencePost) {
                resolve(conferencePost);
            } else {
                reject({
                    code: 404,
                    message: `Not Found: ConferencePost for ID ${conferencePostID}`
                });
                ctx.response.status = 404;
                ctx.response.body = `Not Found: ConferencePost for ID ${conferencePostID}`;
            }
        } catch (error) {
            reject(error);
            ctx.response.status = 500;
        }
    });
};

_validateKeySpeakerID = (keySpeakerID, ctx) => {
    return new Promise(async (resolve, reject) => {
        /* validate input. */
        try {
            const validationResult = await commonValidation.validateID(keySpeakerID);

            resolve(validationResult);
        } catch (errorMessage) {
            /* found errors. */
            errorMessage = errorMessage.replace(`ID`, `KeySpeakerID`);
            // ctx.response.status = 400;
            // ctx.response.body = errorMessage;
            reject(errorMessage);
        }
    });
};

module.exports = router;
