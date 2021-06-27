const Router = require('@koa/router');

const path = require('path');
const fs = require('fs');
const mimeTypes = require('mime-types');

const { addExternalUser } = require('../api/externalUser.api')

/* assets and products dir */
const assetDir = `${process.cwd()}${path.sep}assets`;
const externalUserDir = `${assetDir}${path.sep}externaluser`;
const externalUserDefaultDir = `${assetDir}${path.sep}externaluser${path.sep}default.jpg`;

const router = new Router({
    prefix: '/externaluser'
});


/** insert a internalUser. */
router.post('/', async ctx => {

    const externalUser = ctx.request.body;

    if (externalUser?._id || externalUser?._id === '' || externalUser?._id >= 0) {
        ctx.response.type = 'application/json';
        ctx.response.status = 400; // bad request
        ctx.response.message = 'Error: External User id should not be specified.';
        return;
    }

        try { /* add the externaluser. */
            const generatedResult = await addExternalUser({
                email: externalUser.email,
                name: externalUser.name,
                contactNo : externalUser.contactNo,
                password: externalUser.password,
                type: externalUser.type,
                activityType:externalUser.activityType,
                category:externalUser.category,
                activityInformation:externalUser.activityInformation,
                status:externalUser.status
            }, ctx.request.files?.externalUserImage);
            ctx.response.type = 'application/json';
            ctx.response.status = 201; // created
            ctx.response.body = {
                "generatedId": generatedResult.insertedId
            };

        } catch (error) {
            ctx.response.status = 500; // internal server error.
            console.error(error);
        }

});


module.exports = router;