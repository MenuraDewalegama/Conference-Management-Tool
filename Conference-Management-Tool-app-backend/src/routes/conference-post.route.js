/*
@author : Dhanusha Perera
@date : 26/05/2021
*/

const Router = require('@koa/router');
const idGeneration = require('../service/id-generation.service');
const conferencePostAPI = require('../api/conference-post.api');
const commonValidation = require('../routes/validation/common.validation');
const conferencePostValidation = require('../routes/validation/conference-post.validation');

const router = new Router({
    prefix: '/api/v1/conferences'
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
    const conferencePostDetails = JSON.parse(conferencePostBody?.conferencePostDetails);
    /* validate user input. */
    try {
        await conferencePostValidation.checkKeySpeakersImageFiles(ctx.request?.files, conferencePostDetails.keySpeakers);
    } catch (error) {
        ctx.response.status = error.code;
        ctx.response.body = error.message;
        return;
    }

    /* generate ID for each key speakers. */
    conferencePostDetails.keySpeakers = idGeneration
        .generateIdForElementsInArray(conferencePostDetails.keySpeakers);

    try { /* add the user. */
        const generatedResult = await conferencePostAPI.saveConferencePost({
            topic: conferencePostDetails.topic,
            description: conferencePostDetails.description,
            venue: conferencePostDetails.venue,
            dateTime: conferencePostDetails.dateTime,
            keySpeakers: conferencePostDetails.keySpeakers,
            organizers: conferencePostDetails.organizers, // array
            isApproved: false // conferencePost.isApproved
        }, ctx.request.files);
        ctx.response.type = 'application/json';
        ctx.response.status = 201; // created
        ctx.response.body = {
            'generatedId': generatedResult.insertedId
        };

    } catch (error) {
        ctx.response.status = 500; // internal server error.
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
