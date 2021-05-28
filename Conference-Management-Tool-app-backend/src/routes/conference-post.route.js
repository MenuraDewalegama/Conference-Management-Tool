/*
@author : Dhanusha Perera
@date : 26/05/2021
*/

const Router = require('@koa/router');
const idGeneration = require('../service/id-generation.service');
const conferencePostAPI = require('../api/conference-post.api');

const router = new Router({
    prefix: '/api/v1/conferences'
});

/* get all conference posts. */
router.get('/', async (ctx) => {
    console.log('get all method works!');
    try {
        const result = await conferencePostAPI.getAllConferencePost();
        ctx.response.type = 'application/json';
        ctx.response.status = 200;
        ctx.response.body = result;
    } catch (error) {
        ctx.response.status = 500;
        console.log(error);
    }
});

/*get conference posts by IDs. */
router.get('/:id', async (ctx) => {
    console.log('get method works!');
    const id = ctx.request.params.id;

    /* validate input. */
    /* TODO: validate ID. */

    try {
        ctx.response.type = 'application/json';
        const result = await conferencePostAPI.getConferencePostByID(id);
        if (result) {
            ctx.response.status = 200;
            ctx.response.body = result;
        } else {
            /* no matching user found. */
            ctx.response.status = 404;
        }
    } catch (error) {
        ctx.response.status = 500;
        console.log(error);
    }
});

/* create a new conference post. */
router.post('/', async (ctx) => {
    console.log('post method works!');
    const conferencePostBody = ctx.request.body;
    const conferencePostDetails = JSON.parse(conferencePostBody?.conferencePostDetails);
    /* validate user input. */
    /* TODO: validate conference-post details. */

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
router.put('/', ctx => {
    console.log('put method works!');
});


/* delete an existing conference post. */
router.del('/', ctx => {
    console.log('delete method works!');
});

module.exports = router;
