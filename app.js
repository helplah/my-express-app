const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Elson say we hardly use res
// res.body works can be read, but not req.body because
// first we need to format the req body to a format we can accept

// app.use() mounts this function on top of all the routes,
// thus it fails on some routes that have not req.body.name, without the condition
app.use((req, res, next) => {
  // console.log(req.body);
  req.body.name = req.body.name && req.body.name.toUpperCase();
  next();
});

app.get("/", (req, res) => {
  res.send("Hello Jenssen");
});

// redirects me to /hello-redirect
app.get("/redirect", (req, res) => {
  res.redirect("/hello-redirect");
});

app.get("/hello-redirect", (req, res) => {
  res.send("hello redirect");
});

app.get("/json", (request, response) => {
  return response.json({
    name: "Jenssen"
  });
});

// allow user to download this index.js
app.get("/download", (req, res) => {
  res.download("./index.js");
});

// query parameters
app.get("/:id", (req, res) => {
  const id = req.params.id;
  res.send(id);
  console.log(id);
});

// res.sendFile
app.get("/file1", (req, res) => {
  console.log(__dirname);
  res.sendFile(
    `${__dirname}/index.js`,
    {
      maxAge: 12000
    },
    function(err) {
      if (err) {
        // next(err);
        res.sendStatus(400);
      } else {
        console.log("File Sent");
      }
    }
  );
});

app.post("/json", (req, res) => {
  res.send(req.body);
});

app.put("/json", (req, res) => {
  console.log("put");
});

app.delete("/json", (req, res) => {
  console.log("delete");
});

// comment app.use(bodyParser.json()); and return node index.js
// observe the endpoint again

module.exports.app = app;
// module.exports = app;

/* 
  Refrain from using module.exports = { app } because that means 
    you're replacing module reference with the app object.
*/
