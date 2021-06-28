/*
@author : Dhanusha Perera
@date : 28/06/2021
*/

const Router = require('@koa/router');
const conferencePostAPI = require('../api/conference-post-v2.api');
const commonValidation = require('./validation/common.validation');

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
        const validationResult = await commonValidation.validateID(id);
    } catch (errorMessage) {
        /* found errors. */
        ctx.response.status = 400;
        ctx.response.body = errorMessage;
        return;
    }

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
    const conferencePostDetails = JSON.parse(conferencePostBody?.conferenceDetails);

    /* TODO: validate user input. */

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
            createdDate: new Date(Date.now()).toISOString()
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


/* update an existing conference post. */
router.put('/:id', async (ctx) => {
    const conferencePostID = ctx.request.params.id;

    /* check the given id is valid or not. */
    try {
        const validationResult = await commonValidation.validateID(conferencePostID);
    } catch (errorMessage) {
        /* found errors. */
        ctx.response.status = 400;
        ctx.response.body = errorMessage;
        return;
    }

    let existingConferenceRecord;
    const conferencePostBody = ctx.request.body;
    const conferencePostDetails = JSON.parse(conferencePostBody?.conferencePostDetails);
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

    try { /* update the product. */
        const result = await conferencePostAPI.updateConferencePost(conferencePostID, {
                topic: conferencePostDetails.topic,
                description: conferencePostDetails.description,
                venue: conferencePostDetails.venue,
                dateTime: conferencePostDetails.dateTime,
                keySpeakers: conferencePostDetails.keySpeakers,
                organizers: conferencePostDetails.organizers, // array
                isApproved: false // conferencePost.isApproved
            }, ctx.request.files,
            existingConferenceRecord);
        ctx.response.status = 204;
        if (result.modifiedCount === 1) {
            /* update successful. */
            ctx.response.status = 204;
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
    try {
        await commonValidation.validateID(conferencePostID);
    } catch (error) {
        ctx.response.status = 400;
        ctx.response.body = error;
        return;
    }

    try {
        const result = await conferencePostAPI.getConferencePostByID(conferencePostID);
        if (result) {
            /* found a matching record for the given ID. */
            try {
                const result = await conferencePostAPI.deleteConferencePost(conferencePostID);
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

module.exports = router;
