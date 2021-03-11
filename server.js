const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const ObjectId = require("mongodb").ObjectID;
const MongoClient = require("mongodb").MongoClient;

const uri =   "mongodb+srv://crud-nodejs.fvtpn.mongodb.net/crud-nodejs";

MongoClient.connect(uri, (err, client) => {
  if (err) return console.log(err);
  db = client.db("crud-nodejs"); // coloque o nome do seu DB

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
});

app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app
  .route("/") //setado a rota,

  .get(function (req, res) {
    const cursor = db.collection("data").find();
    res.render("index.ejs");
  });

app.post("/show", (req, res) => {
  db.collection("data").save(req.body, (err, result) => {
    if (err) return console.log(err);

    console.log("Salvo no Banco de Dados");
    res.redirect("/show");
  });
});

app.route("/show").get((req, res) => {
  db.collection("data")
    .find()
    .toArray((err, results) => {
      if (err) return console.log(err);
      res.render("show.ejs", { data: results });
    });
});

app
  .route("/edit/:id")
  .get((req, res) => {
    var id = req.params.id;

    db.collection("data")
      .find(ObjectId(id))
      .toArray((err, result) => {
        if (err) return res.send(err);
        res.render("edit.ejs", { data: result });
      });
  })

  .post((req, res) => {
    var id = req.params.id;
    var placa = req.body.placa;
    var chassi = req.body.chassi;
    var renavam = req.body.renavam;
    var modelo = req.body.modelo;
    var marca = req.body.marca;
    var ano = req.body.ano;
   
    db.collection("data").updateOne(
      { _id: ObjectId(id) },
      {
        $set: {
          placa: placa,
          chassi: chassi,
          renavam: renavam,
          modelo: modelo,
          marca: marca,
          ano: ano,

        },
      },
      (err, result) => {
        if (err) return res.send(err);
        res.redirect("/show");
        console.log("Atualizado no Banco de Dados");
      }
    );
  });

app.route("/delete/:id").get((req, res) => {
  var id = req.params.id;

  db.collection("data").deleteOne({ _id: ObjectId(id) }, (err, result) => {
    if (err) return res.send(500, err);
    console.log("Deletado do Banco de Dados!");
    res.redirect("/show");
  });
});
