const Koa = require('koa');
const fs = require('fs');
const path = require('path');
const koaBody = require('koa-body');
const jwt = require('jsonwebtoken');
const koaJWT = require('koa-jwt');
const unless = require('koa-unless');
const ms = require('ms');
const serve = require('koa-static');
const dotenv = require('dotenv').config();
require('./src/util/database.util');
const directoryService = require('./src/service/dir.service');

const app = new Koa();
const PORT = process.env.dPORT;

/* enable CORS. */
const cors = require('@koa/cors');
app.use(cors());

/* enable koa-body. */
app.use(koaBody({multipart: true}));

/* create assets dir if not exists. */
directoryService.createDirIfNotExists();

/* koa-static */
app.use(serve('./public'));

/* routes. */
// const conferencePostRoutes = require('./src/routes/conference-post.route');
const conferencePostV2Routes = require('./src/routes/conference-post-v2.route');
const keySpeakerRoutes = require('./src/routes/key-speaker.routes');
const InternalUserRoutes = require('../Conference-Management-Tool-app-backend/src/routes/internalUser.routes');

const externalUserRoutes = require('../Conference-Management-Tool-app-backend/src/routes/externalUser.routes');

const membersRoutes = require('../Conference-Management-Tool-app-backend/src/routes/members.routes');

const researchPaperRoutes = require('./src/routes/reviewerActivity.routes');

const loginRoutes = require('../Conference-Management-Tool-app-backend/src/routes/login.routes');

const contactUsRoutes = require('./src/routes/contactUs.route');

/* auth route and assets routes are exposed here. */

/* JWT - 401 error handling. */

/* JWT protected routes should place under this line. */

/* app routes are set here. */
/* OLD route for conference-post CRUD. This will be disabled in near future. */
// app.use(conferencePostRoutes.routes()).use(conferencePostRoutes.allowedMethods());

/* NEW route for conference-post CRUD. */
app.use(conferencePostV2Routes.router.routes()).use(conferencePostV2Routes.router.allowedMethods());

app.use(keySpeakerRoutes.routes()).use(keySpeakerRoutes.allowedMethods());

app.use(InternalUserRoutes.routes()).use(InternalUserRoutes.allowedMethods());

app.use(externalUserRoutes.routes()).use(externalUserRoutes.allowedMethods());

app.use(researchPaperRoutes.routes()).use(researchPaperRoutes.allowedMethods());

app.use(loginRoutes.routes()).use(loginRoutes.allowedMethods());

app.use(contactUsRoutes.routes()).use(contactUsRoutes.allowedMethods());

app.use(membersRoutes.routes()).use(membersRoutes.allowedMethods());


/* server. */
app.listen(PORT, (error) => {
    if (error) {
        console.error('Something went wrong when server starts!');
    } else {
        console.log(`Server is started on port ${PORT}`);
    }
});
