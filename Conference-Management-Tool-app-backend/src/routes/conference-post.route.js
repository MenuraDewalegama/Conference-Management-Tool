/*
@author : Dhanusha Perera
@date : 26/05/2021
*/

const Router = require('@koa/router');

const router = new Router({
    prefix: '/api/v1/conferences'
});

/* get all conference posts. */
router.get('/', ctx => {
    console.log('get all method works!');
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
