const request = require("supertest");
const { app } = require("../app");

app.get("/user", function(req, res) {
  res.status(200).json({ name: "john" });
});

it("GET / returns hello world", async () => {
  const response = await request(app).get("/");
  // console.log(response);
  expect(response.text).toEqual("Hello Jenssen");
});

describe("/json", () => {
  it("GET should return object with name Jenssen", async () => {
    const response = await request(app).get("/json");
    console.log(response);
    expect(response.body).toEqual({ name: "Jenssen" });
  });
});
