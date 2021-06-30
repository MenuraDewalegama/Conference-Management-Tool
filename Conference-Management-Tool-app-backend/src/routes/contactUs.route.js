const Router = require('@koa/router');

const { insertMessage, getAllMessages, deleteMessage } = require('../api/contactUs.api');

// Prefix of the route
const router = new Router({
    prefix: '/contact'
});

// Route to insert a message 
router.post('/', async ctx => {

    const contactInfo = ctx.request.body;

    if (contactInfo?._id || contactInfo?._id === '' || contactInfo?._id >= 0) {
        ctx.response.type = 'application/json';
        ctx.response.status = 400;
        ctx.response.message = 'Error: External User id should not be specified.';
        return;
    }

    try {
        const result = await insertMessage({
            email: contactInfo.email,
            name: contactInfo.name,
            subject: contactInfo.subject,
            message: contactInfo.message
        });
        ctx.response.type = 'application/json';
        ctx.response.status = 201;
        ctx.response.body = {
            result
        };
    } catch (error) {
        ctx.response.status = 500;
        console.error(error);
    }

});

// Route to get all the messages
router.get('/', async ctx => {
    try {
        const messages = await getAllMessages();
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.response.body = JSON.stringify(messages);
    } catch (error) {
        ctx.response.status = 500;
    }
});

// Route to delete a message
router.del('/:id', async ctx => {
    const id = ctx.params.id;
    try {
        const result = await deleteMessage(id);
        // console.log(result);
        ctx.response.status = 200;
    } catch (error) {
        ctx.response.status = 500;
        console.error(error);
    }

});

module.exports = router;