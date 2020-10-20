const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
const { MongoClient } = require("mongodb");

const Product = require("../API/models/product");
const { restart } = require("nodemon");

mongoose.connect(
    `mongodb+srv://alexvision:${process.env.MONGODB_PASS}@tracker-app-db.psowr.azure.mongodb.net/${process.env.MY_DB}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

server.post("/", (req, res) => {
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price
    });
    product.save().then(result => {
        console.log(result)
        res.status(201).json(result)
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

server.get("/:productId", (req, res, next) => {
    const id = req.params.productId
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc)
        res.status(200).json(doc)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: err})
    })
})

module.exports = server;