const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Thing = require("./models/Thing");
const thingSchema = require("./models/Thing");
// connect to mongoDB

mongoose
  .connect(
    "mongodb+srv://admin:admin1234@cluster0.rkr2qx9.mongodb.net/?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

app.use(express.json());

// CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.get("/api/stuff", (req, res, next) => {
  Thing.find()
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
});

app.post("/api/stuff", (req, res, next) => {
  delete req.body._id;
  const newThing = new Thing({ ...req.body });
  // save the new element to DB
  newThing
    .save()
    .then(() => {
      res.status(201).json({
        message: "object created successfully",
      });
    })
    .catch((error) => res.status(400).json({ error }));
});

app.get("/api/stuff/:id", (req, res, next) => {
  Thing.findById(req.params.id)
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
});
app.put("/api/stuff/:id", (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then((thing) => res.status(200).json({ message: "objet modifier" }))
    .catch((error) => res.status(400).json({ error }));
});
module.exports = app;
