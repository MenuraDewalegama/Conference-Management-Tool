const Router = require('@koa/router');

const path = require('path');
const fs = require('fs');
const mimeTypes = require('mime-types');

const { addInternalUser, getInternalUsers, getInternalUser, updateInternalUser, deleteInternalUser } = require('../api/internalUser.api')

/* assets and products dir */
const assetDir = `${process.cwd()}${path.sep}assets`;
const internalUsersDir = `${assetDir}${path.sep}internaluser`;
const internalUsersDefaultDir = `${assetDir}${path.sep}internaluser${path.sep}default.jpg`;

const router = new Router({
    prefix: '/internaluser'
});

/** get all internalUsers. */
router.get('/', async ctx => {
    try {
        const post = await getInternalUsers();
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.response.body = JSON.stringify(post);
    } catch (error) {
        ctx.response.status = 500;
    }
});

/** get a internalUser by given ID. */
router.get('/:id', async ctx => {
    const id = ctx.params.id;
    try {
        ctx.response.type = 'application/json';
        const result = await getInternalUser(id);
        if (result) {
            ctx.response.status = 200;
            ctx.response.body = result;
        } else {
            ctx.response.status = 404;
        }
    } catch (error) {
        ctx.response.status = 500;
        // console.log(error);
        console.log(ctx.params.id);
    }
});

/** insert a internalUser. */
router.post('/', async ctx => {

    const internalUser = ctx.request.body;
    console.log("route eke")
    console.log(internalUser);
    if (internalUser?._id || internalUser?._id === '' || internalUser?._id >= 0) {
        ctx.response.type = 'application/json';
        ctx.response.status = 400; // bad request
        ctx.response.message = 'Error: Internal User id should not be specified.';
        return;
    }

        try { /* add the internalUser. */
            const generatedResult = await addInternalUser({
                fullName: internalUser.fullName,
                contactNo: internalUser.contactNo,
                email: internalUser.email,
                password: internalUser.password,
                type: internalUser.type
            }, ctx.request.files?.internalUserImage);
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

/** update the internalUser by given ID. */
router.put('/:id', async ctx => {
    const id = ctx.params.id;
    let existingInternalUserRecord;
    console.log(ctx.request.body);


    /* check whether there is a matching record for the given id. */
    try {
        const result = await getInternalUser(id);
        existingInternalUserRecord = result;
        if (!result) {
            /* if no record found. */
            ctx.response.status = 404;
        }
    } catch (error) {
        /* something went wrong when finding a matching record. */
        ctx.response.status = 500;
        console.error(error);
        return;
    }

    /* read the request body and get the internalUser details. */
    let internalUser = ctx.request.body;

  
        try { /* update the internalUser. */
            const result = await updateInternalUser(id, {
                fullName: internalUser.fullName,
                contactNo: internalUser.contactNo,
                email: internalUser.email,
                type: internalUser.type,
                password: internalUser.password,
                    imagePath: (internalUser?.imagePath?.length === 0) ? null : internalUser?.imagePath
                },
                ctx.request.files?.internalUserImage,
                existingInternalUserRecord);
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

/** delete a internalUser by given ID. */
router.del('/:id', async ctx => {
    const id = ctx.params.id;

    try {
        const result = await getInternalUser(id);
        console.log(result);
        if (result) {
            /* found a matching record for the given ID. */
            try {
                const result = await deleteInternalUser(id);
                if (result?.deletedCount === 1) {
                    /* record delete successfully. */
                    ctx.response.status = 200;
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