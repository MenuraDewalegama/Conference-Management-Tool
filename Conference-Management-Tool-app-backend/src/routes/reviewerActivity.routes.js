const Router = require('@koa/router');
const path = require('path');
const fs = require('fs');
const mimeTypes = require('mime-types');
const { getAllPapers, updateStatus } = require('../api/reviewerActivity.api');

const router = new Router({
    prefix: '/research-papers'
});

/** get all research papers. */
router.get('/', async ctx => {
    try {
        const papers = await getAllPapers();
        ctx.response.status = 200;
        ctx.response.type = 'application/json';
        ctx.response.body = JSON.stringify(papers);
        console.log(papers)
    } catch (error) {
        ctx.response.status = 500;
    }
});

router.put('/:id', async ctx => {
    const id = ctx.params.id;
    const review = ctx.request.body;
    try {
        const res = await updateStatus(id, {
            status: review.status
        });
        ctx.response.status = 204;
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
