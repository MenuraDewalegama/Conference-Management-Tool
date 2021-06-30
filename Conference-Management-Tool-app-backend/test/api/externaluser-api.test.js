const koa = require("koa"); // import koa
const serverRoutes = require("../../app"); //import file we are testing
const request = require("supertest"); // supertest is a framework that allows to easily test web apis
const app =new koa(); //an instance of an koa app, a 'fake' express app
// app.use("/members", serverRoutes); //routes

const membersRoutes = require('../routes/members.routes');
app.use(membersRoutes.routes()).use(membersRoutes.allowedMethods());


//test commiitee member post function
describe("testing-committe-member-endpoints", () => {
  it("GET /members - success", async () => {
    const { body } = await request(app).get("/members"); //uses the request function that calls on express app instance
    expect(body).toEqual([
      {
        name: "Mr. Sri Vaas",
        designation: "Chairman - Virtusa",
        information: "Well recognized IT speaker in Sri Lanka",
        imagePath:'/assets/members/60db44d30196cc1fa8a1ce0b.jpeg'
      }
    ]);
  });
});