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

const app = new Koa();
const PORT = process.env.dPORT;

/* enable CORS. */
const cors = require('@koa/cors');
app.use(cors());

/* enable koa-body. */
app.use(koaBody({multipart: true}));

/* directory paths declaration. */

/* create assets dir if not exists. */

/* create dir when needed. */

/* routes. */

/* auth route and assets routes are exposed here. */

/* JWT - 401 error handling. */

/* JWT protected routes should place under this line. */

/* app routes are set here. */


/* server. */
app.listen(PORT,(error) => {
    if (error) {
        console.error('Something went wrong when server starts!');
    } else {
        console.log(`Server is started on port ${PORT}`);
    }
});

