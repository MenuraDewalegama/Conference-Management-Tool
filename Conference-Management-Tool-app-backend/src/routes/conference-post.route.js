/*
@author : Dhanusha Perera
@date : 26/05/2021
*/

const Router = require('@koa/router');
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
router.get('/:id', ctx => {
    console.log('get method works!');
});

/* create a new conference post. */
router.post('/', ctx => {
    console.log('post method works!');
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
