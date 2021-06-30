const koa = require("koa");
const serverRoutes = require("../../app"); 
const request = require("supertest"); 
const app = new koa(); 

const reviewerActivityRoutes = require('../routes/reviewerActivity.routes');
app.use(reviewerActivityRoutes.routes()).use(reviewerActivityRoutes.allowedMethods());

// Checking get request from reviewer activity endpoint
describe("testing-reviwer-activity-endpoints", () => {
    it("GET /papers - success", async () => {
        const result = await request(app).get("/papers"); 
        expect(result.status).toEqual(200);
    });
});