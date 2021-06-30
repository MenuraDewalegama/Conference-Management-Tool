/*
@author : Dhanusha Perera
@date : 28/06/2021
*/

const Router = require('@koa/router');
const conferencePostAPI = require('../api/conference-post-v2.api');
const commonValidation = require('./validation/common.validation');
const conferencePostV2Validation = require('./validation/conference-post-v2.validation');
const { approvePost } = require('../api/conference-post-v2.api')

const router = new Router({
    prefix: '/api/v2/conferences'
});

/* get all conference posts. */
router.get('/', async (ctx) => {
    try {
        const result = await conferencePostAPI.getAllConferencePost();
        ctx.response.type = 'application/json';
        ctx.response.status = 200;
        ctx.response.body = result;
    } catch (error) {
        ctx.response.status = 500;
        console.error(error);
    }
});

/*get conference posts by IDs. */
router.get('/:id', async (ctx) => {
    const id = ctx.request.params.id;

    /* validate input. */
    try {
        const validationResult = await _validateConferencePostID(id, ctx);
    } catch (errorMessage) {
        console.error(errorMessage);
        return;
    }

    // try {
    //     const validationResult = await commonValidation.validateID(id);
    // } catch (errorMessage) {
    //     /* found errors. */
    //     ctx.response.status = 400;
    //     ctx.response.body = errorMessage;
    //     return;
    // }

    try {
        ctx.response.type = 'application/json';
        const result = await conferencePostAPI.getConferencePostByID(id);
        if (result) {
            ctx.response.status = 200;
            ctx.response.body = result;
            console.log(result);
        } else {
            /* no matching user found. */
            ctx.response.status = 404;
        }
    } catch (error) {
        ctx.response.status = 500;
        console.error(error);
    }
});


/* create a new conference post. */
router.post('/', async (ctx) => {
    const conferencePostBody = ctx.request.body;

    /* TODO: validate user input. */
    /* check for the content content type. */
    if (ctx.request.type !== 'multipart/form-data') {
        /* send BAD REQUEST */
        ctx.response.type = 'text/plain';
        ctx.response.status = 400;
        ctx.response.body = `Invalid Content-Type: Content-Type should be multipart/form-data`;
        return;
    }

    /* checks for the conferencePostImage is included. */
    if (ctx.request.files.hasOwnProperty('conferencePostImage') && ctx.request.files?.conferencePostImage?.size === 0) {
        /* send BAD REQUEST */
        ctx.response.type = 'text/plain';
        ctx.response.status = 400;
        ctx.response.body = `conferencePostImage is required. Image should be uploaded.`;
        return;
    }


    /* checks for the conference post details errors. */
    const conferencePostDetails = JSON.parse(conferencePostBody?.conferenceDetails);
    const errorMessages = conferencePostV2Validation.validateConferencePost(conferencePostDetails);

    if (errorMessages.length !== 0) {
        /* send BAD REQUEST */
        ctx.response.type = 'text/plain';
        ctx.response.status = 400;
        ctx.response.body = errorMessages;
        return;
    }

    try {
        /* add the conference post. */
        const result = await conferencePostAPI.saveConferencePost({
            topic: conferencePostDetails.topic,
            description: conferencePostDetails.description,
            venue: conferencePostDetails.venue,
            dateTime: conferencePostDetails.dateTime,
            mainImageURI: null, // mainImageURI
            keySpeakersURI: null, // keySpeakerURI
            isApproved: false, // conferencePost.isApproved
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



/** update the internalUser by given ID. */
router.put('/approve/:id', async ctx => {
    const conferencePostID = ctx.request.params.id;
    let existingInternalUserRecord;
    console.log(ctx.request.body);


    /* check whether there is a matching record for the given id. */
    try {
        const result = await approvePost(conferencePostID);
        existingInternalUserRecord = result;
        if (!result) {
            /* if no record found. */
            ctx.response.status = 200;
        }
    } catch (error) {
        /* something went wrong when finding a matching record. */
        ctx.response.status = 500;
        console.error(error);
        return;
    }

  

});

/* update an existing conference post. */
router.put('/:id', async (ctx) => {
    let existingConferenceRecord;
    const conferencePostID = ctx.request.params.id;

    /* check the given id is valid or not. */
    /* validate input. */
    try {
        const validationResult = await _validateConferencePostID(conferencePostID, ctx);
    } catch (errorMessage) {
        console.error(errorMessage);
        return;
    }

    // try {
    //     const validationResult = await commonValidation.validateID(conferencePostID);
    // } catch (errorMessage) {
    //     /* found errors. */
    //     ctx.response.status = 400;
    //     ctx.response.body = errorMessage;
    //     return;
    // }

    const conferencePostBody = ctx.request.body;
    const conferencePostDetails = JSON.parse(conferencePostBody?.conferenceDetails);
    /* validate user input. */
    /* TODO: validate conference-post details. */

    /* check whether there is a matching record for the given id. */
    try {
        const result = await conferencePostAPI.getConferencePostByID(conferencePostID);
        existingConferenceRecord = result;
        if (!result) {
            /* if no record found. */
            ctx.response.status = 404;
            return;
        }
    } catch (error) {
        /* something went wrong when finding a matching record. */
        ctx.response.status = 500;
        console.error(error);
        return;
    }

    const conferencePostData = {
        topic: conferencePostDetails.topic,
        description: conferencePostDetails.description,
        venue: conferencePostDetails.venue,
        dateTime: conferencePostDetails.dateTime,
        mainImageURI: existingConferenceRecord.mainImageURI, // mainImageURI
        keySpeakersURI: existingConferenceRecord.keySpeakersURI, // keySpeakerURI
        // isApproved: (conferencePostDetails.isApproved) ? conferencePostDetails.isApproved : false,
        createdDate: existingConferenceRecord.createdDate,
        updatedDate: new Date(Date.now()).toISOString()
    };

    if (ctx.request?.files?.conferencePostImage && conferencePostDetails?.mainImageURI) {
        ctx.response.status = 400;
        ctx.response.body = `Invalid: ConferencePostImage and mainImageURI both are provided. Please provide ConferencePostImage only to update the image.`;
        return;
    }

    try { /* update the product. */
        const result = await conferencePostAPI.updateConferencePost(conferencePostID,
            conferencePostData,
            ctx.request.files, // uploaded files
            existingConferenceRecord);
        // ctx.response.status = 204;
        if (result.code === 204) { // NO-CONTENT = 204
            /* update successful. */
            ctx.response.status = result.code;
        }
    } catch (error) {
        /* something wrong with update process. */
        ctx.response.status = 500; // internal server error.
        console.error(error);
    }

});


/* delete an existing conference post. */
router.del('/:id', async (ctx) => {
    const conferencePostID = ctx.params.id;

    /* check the given id is valid or not. */
    /* validate input. */
    try {
        const validationResult = await _validateConferencePostID(conferencePostID, ctx);
    } catch (errorMessage) {
        console.error(errorMessage);
        return;
    }

    // try {
    //     await commonValidation.validateID(conferencePostID);
    // } catch (error) {
    //     ctx.response.status = 400;
    //     ctx.response.body = error;
    //     return;
    // }

    try {
        const existingRecord = await conferencePostAPI.getConferencePostByID(conferencePostID);
        if (existingRecord) {
            /* found a matching record for the given ID. */
            try {
                const result = await conferencePostAPI.deleteConferencePost(conferencePostID, existingRecord);
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
        } else {
            /* no matching record found for the given ID. */
            ctx.response.status = 404;
        }

    } catch (error) {
        /* something went wrong when finding a matching record. */
        ctx.response.status = 500;
        console.error(error);
    }
});


_validateConferencePostID = (id, ctx) => {
    return new Promise(async (resolve, reject) => {
        /* validate input. */
        try {
            const validationResult = await commonValidation.validateID(id);

            resolve(validationResult);
        } catch (errorMessage) {
            /* found errors. */
            errorMessage = errorMessage.replace(`ID`, `ConferencePostID`);
            // ctx.response.status = 400;
            // ctx.response.body = errorMessage;
            reject(errorMessage);
        }
    });
};

// _isRecordExists = (conferencePostID) => {
//     return new Promise((resolve, reject) => {
//
//     });
// };

module.exports = {
    router,
    validateConferencePostID: _validateConferencePostID,
};
