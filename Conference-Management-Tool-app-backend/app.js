const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const koaBody = require('koa-body');
const jwt = require('jsonwebtoken');
const koaJWT = require('koa-jwt');
const unless = require('koa-unless');
const ms = require('ms');
const dotenv = require('dotenv').config();
require('./src/util/database.util');
const directoryService = require('./src/service/dir.service');

const app = new Koa();
const PORT = process.env.dPORT;

/* enable CORS. */
const cors = require('@koa/cors');
app.use(cors());

/* enable koa-body. */
app.use(koaBody({ multipart: true }));

/* create assets dir if not exists. */
directoryService.createDirIfNotExists();

/* routes. */
const conferencePostRoutes = require('./src/routes/conference-post.route');
// console.log(conferencePostRoutes);
const InternalUserRoutes = require('../Conference-Management-Tool-app-backend/src/routes/internalUser.routes');

const externalUserRoutes = require('../Conference-Management-Tool-app-backend/src/routes/externalUser.routes');

const researchPaperRoutes = require('./src/routes/reviewerActivity.routes');


/* auth route and assets routes are exposed here. */

/* JWT - 401 error handling. */

/* JWT protected routes should place under this line. */

/* app routes are set here. */
app.use(conferencePostRoutes.routes()).use(conferencePostRoutes.allowedMethods());

app.use(InternalUserRoutes.routes()).use(InternalUserRoutes.allowedMethods());

app.use(externalUserRoutes.routes()).use(externalUserRoutes.allowedMethods());

app.use(researchPaperRoutes.routes()).use(researchPaperRoutes.allowedMethods());

/* server. */
app.listen(PORT, (error) => {
    if (error) {
        console.error('Something went wrong when server starts!');
    } else {
        console.log(`Server is started on port ${PORT}`);
    }
});
