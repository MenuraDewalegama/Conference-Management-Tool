const Router = require('@koa/router');
const path = require('path');
const fs = require('fs');
const mimeTypes = require('mime-types');
const { addMember, getMember, getAllMembers,updateMember ,deleteMember} = require('../api/committee.api');

/* assets and products dir */
const assetDir = `${process.cwd()}${path.sep}assets`;
const speechesDir = `${assetDir}${path.sep}speeches`;
const speechesDefaultDir = `${assetDir}${path.sep}speeches${path.sep}default.jpg`;

//define prefix for members in backend
const router = new Router({
    prefix: '/members'
});


/** insert a member. */
router.post('/', async ctx => {
    const member = ctx.request.body;
    if (member?._id || member?._id === '' || member?._id >= 0) {
        ctx.response.type = 'application/json';
        ctx.response.status = 400; // bad request
        ctx.response.message = 'Error: Key note member id should not be specified.';
        return;
    }
    try { 
        const generatedResult = await addMember({
            name: member.name,
            designation: member.designation,
            information: member.information
        }, ctx.request.files?.speecherImage);
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

//get member
router.get('/', async ctx => {
    try {
        const post = await getAllMembers();
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.response.body = JSON.stringify(post);
    } catch (error) {
        ctx.response.status = 500;
    }
});

//update member
router.put('/:id', async ctx => {
    const id = ctx.params.id;
    /* read the request body and get the member details. */
    let member = ctx.request.body;
    try { /* update the member. */
        const result = await updateMember(id, {
            name: member.name,
            designation: member.designation,
            information: member.information,
        });
        ctx.response.status = 200;
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

//get member by ID
router.get('/:id', async ctx => {
    const id = ctx.params.id;
    try {
        ctx.response.type = 'application/json';
        const result = await getMember(id);
        if (result) {
            ctx.response.status = 200;
            ctx.response.body = result;
        } else {
            ctx.response.status = 404;
        }
    } catch (error) {
        ctx.response.status = 500;
        console.log(ctx.params.id);
    }
});



/** delete a member  by given ID. */
router.del('/:id', async ctx => {
    const id = ctx.params.id;
    try {
        const result = await getMember(id);
        console.log(result);
        if (result) {
            /* found a matching record for the given ID. */
            try {
                const result = await deleteMember(id);
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