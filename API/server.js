const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const mongoose = require("mongoose");
// const { MongoClient } = require("mongodb");

// const { Users, Jobs, Contacts, Activities } = require("./models/schema");

const usersRouter = require("./routes/users-route");
const jobsRouter = require("./routes/jobs-route");
const authRouter = require("./routes/auth-route");
const restricted = require("../middleware/restricted-middleware");

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

server.use("/api/auth", authRouter)
server.use("/api/users", restricted, usersRouter)
server.use("/api/:id/jobs", jobsRouter)

server.get("/", (req, res) => {
  res.status(200).json({ api: "running" });
});

module.exports = server;