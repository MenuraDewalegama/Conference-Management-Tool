const koa = require("koa"); // import koa
const serverRoutes = require("../../app"); //import file we are testing
const request = require("supertest"); // supertest is a framework that allows to easily test web apis
const app = new koa(); //an instance of an koa app, a 'fake' express app
// app.use("/members", serverRoutes); //routes

const reviewerActivityRoutes = require('../routes/reviewerActivity.routes');
app.use(reviewerActivityRoutes.routes()).use(reviewerActivityRoutes.allowedMethods());


describe("testing-reviwer-activity-endpoints", () => {
    it("GET /research-papers - success", async () => {
        const result = await request(app).get("/research-papers"); //uses the request function that calls on express app instance
        expect(result.status).toEqual(200);
    });
});