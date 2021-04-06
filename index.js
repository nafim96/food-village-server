const express = require("express");
const cors = require("cors");
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const ObjectId = require("mongodb").ObjectId;
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const port = 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.oli9n.mongodb.net/${process.env.DB_DATA_BASE}?retryWrites=true&w=majority`;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
client.connect((err) => {
  const breakFastCollection = client
    .db(`${process.env.DB_DATA_BASE}`)
    .collection("breakFast");

  const lunchCollection = client
    .db(`${process.env.DB_DATA_BASE}`)
    .collection("lunch");

  const dinnerCollection = client
    .db(`${process.env.DB_DATA_BASE}`)
    .collection("dinner");

  app.post("/addBreakFast/", (req, res) => {
    const newFood = req.body;
    breakFastCollection.insertOne(newFood).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
  app.post("/addLunch/", (req, res) => {
    const newFood = req.body;
    lunchCollection.insertOne(newFood).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
  app.post("/addDinner/", (req, res) => {
    const newFood = req.body;
    dinnerCollection.insertOne(newFood).then((result) => {
      res.send(result.insertedCount > 0);
    });
  });
});

app.listen(process.env.PORT || port);
