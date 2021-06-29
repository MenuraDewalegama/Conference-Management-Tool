/*
@author : Dhanusha Perera
@date : 29/06/2021
*/

const router = require('./conference-post-v2.route').router;
const conferencePostV2Route = require('./conference-post-v2.route');
const conferencePostV2API = require('../api/conference-post-v2.api');
const commonValidation = require('./validation/common.validation');
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
        const validationResult = _validateKeySpeakerID(keySpeakerID, ctx);
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

router.post('/:conferencePostID/keyspeakers', (ctx) => {
    console.log('create new key-speaker.');
});

router.put('/:conferencePostID/keyspeakers/:keySpeakerID', (ctx) => {
    console.log('update existing key-speaker.');
});

router.del('/:conferencePostID/keyspeakers/:keySpeakerID', (ctx) => {
    console.log('delete existing key-speaker.');
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
                    message: `Not Found: ConferencePost for ${conferencePostID}`
                });
                ctx.response.status = 404;
                ctx.response.body = `Not Found: ConferencePost for ${conferencePostID}`;
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
