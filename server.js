/* console.log(' A força está com voçê') */
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, function () {
  console.log(" A força está com voçê");
  console.log("server running on port 3000");
});

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs");
});

app.post("/show", (req, res) => {
  /*  console.log('Hello again..') */
  console.log(req.body);
});

app.use(express.static('public'))


/* Salando dados em arquivo */
/* 
var texto = [];
 texto = JSON.stringify(req.body); */
 
 let texto = "O silencio vale ouro!"

var fs = require("fs");
fs.writeFile("/tmp/test", texto , function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("The file was saved!");
  }
});

