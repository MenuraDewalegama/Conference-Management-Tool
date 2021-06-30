const Router = require('@koa/router');
const path = require('path');
const fs = require('fs');
const mimeTypes = require('mime-types');
const { getPasswordbyEmail, getPasswordbyEmailInternal } = require('../dal/login.dao');

//define prefix for login backend
const router = new Router({
    prefix: '/login'
});


//get password by sending the email - external users
router.get('/:email', async ctx => {
    try {
        ctx.response.type = 'application/json';
        const generatedResult = await getPasswordbyEmail(ctx.request.params.email);
        if (generatedResult) {
            ctx.response.status = 200; //success
            ctx.response.body = generatedResult;
        } else {
            ctx.response.status = 404; //bad request
        }
    } catch (error) {
        ctx.response.status = 500; // internal server error.
        console.error(error);
    }
}
);


//get password by sending the email - internal users
router.get('/internal/:email', async ctx => {
    console.log(ctx.request.params.email)
    try {
        ctx.response.type = 'application/json';
        const generatedResult = await getPasswordbyEmailInternal(ctx.request.params.email);
        if (generatedResult) {
            ctx.response.status = 200; //success
            ctx.response.body = generatedResult;
        } else {
            ctx.response.status = 404; //bad request
        }
    } catch (error) {
        ctx.response.status = 500; // internal server error.
        console.error(error);
    }
}
);



module.exports = router;