const Router = require('@koa/router');

const path = require('path');
const fs = require('fs');
const mimeTypes = require('mime-types');

const { addKeyNoteSpeech } = require('../api/speeches.api');
const { getAllSpeakers } = require('../dal/speeches.dao');

/* assets and products dir */
const assetDir = `${process.cwd()}${path.sep}assets`;
const speechesDir = `${assetDir}${path.sep}speeches`;
const speechesDefaultDir = `${assetDir}${path.sep}speeches${path.sep}default.jpg`;

const router = new Router({
    prefix: '/speeches'
});


/** insert a internalUser. */
router.post('/', async ctx => {

    const speech = ctx.request.body;

    if (speech?._id || speech?._id === '' || speech?._id >= 0) {
        ctx.response.type = 'application/json';
        ctx.response.status = 400; // bad request
        ctx.response.message = 'Error: Key note speech id should not be specified.';
        return;
    }

    try { /* add the externaluser. */
        const generatedResult = await addKeyNoteSpeech({
            name: speech.name,
            designation: speech.designation,
            information: speech.information
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

router.get('/', async ctx => {
    try {
        const post = await getAllSpeakers();
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.response.body = JSON.stringify(post);
    } catch (error) {
        ctx.response.status = 500;
    }
});


module.exports = router;