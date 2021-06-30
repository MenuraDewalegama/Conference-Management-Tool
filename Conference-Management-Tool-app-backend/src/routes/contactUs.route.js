const Router = require('@koa/router');

const { insertMessage } = require('../api/contactUs.api');


const router = new Router({
    prefix: '/contact'
});


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


module.exports = router;