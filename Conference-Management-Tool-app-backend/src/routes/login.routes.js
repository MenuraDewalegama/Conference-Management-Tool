const Router = require('@koa/router');

const path = require('path');
const fs = require('fs');
const mimeTypes = require('mime-types');

const { getPasswordbyEmail,getPasswordbyEmailInternal } = require('../dal/login.dao');

const router = new Router({
    prefix: '/login'
});



router.get('/:email', async ctx => {

    console.log(ctx.request.params.email)

    try { /* add the externaluser. */
        ctx.response.type = 'application/json';
        const generatedResult = await getPasswordbyEmail(ctx.request.params.email);
        if (generatedResult) {
            ctx.response.status = 200;
            ctx.response.body = generatedResult;
        } else {
            ctx.response.status = 404;
        }
    } catch (error) {
        ctx.response.status = 500; // internal server error.
        console.error(error);
    }
}
);

router.get('/internal/:email', async ctx => {

    console.log(ctx.request.params.email)

    try { /* add the externaluser. */
        ctx.response.type = 'application/json';
        const generatedResult = await getPasswordbyEmailInternal(ctx.request.params.email);
        if (generatedResult) {
            ctx.response.status = 200;
            ctx.response.body = generatedResult;
        } else {
            ctx.response.status = 404;
        }
    } catch (error) {
        ctx.response.status = 500; // internal server error.
        console.error(error);
    }
}
);



module.exports = router;