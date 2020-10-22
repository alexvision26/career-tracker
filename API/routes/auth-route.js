const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secrets");
const mongoose = require("mongoose");
const { User } = require("../models/schema");

// REGISTER ACCOUNT

router.post('/register', validateUserContent, (req, res) => {
    let user = new User({
        _id: new mongoose.Types.ObjectId,
        email: req.body.email,
        password: req.body.password,
        name: req.body.name,
        industry: req.body.industry,
    })
    const hash = bcrypt.hashSync(user.password, 10);
    user.password = hash

    user.save().then(result => {
        console.log(result)
        res.status(201).json({ message: "Account successfully created." })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: "There was an error creating account. Please try again." })
    })
})

// LOGIN ACCOUNT

router.post("/login", validateUserContent, (req, res) => {
    let { email, password } = req.body;

    User.findOne({ email: email }).then(result => {
        if (result && bcrypt.compareSync(password, result.password)) {
            const token = generateToken(result)

            res.status(200).json({
                message: `Welcome ${result.name}!`,
                id: result._id,
                token
            });
        } else {
            res.status(401).json({ message: "Invalid credentials" })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// ---------------------- Generate Token ---------------------- //

function generateToken(user) {
    const payload = {
      subject: user.id, // standard claim = sub
      username: user.username,
      // role: user.role || "user"  (optional: if there's role in db schema)
    };
    const options = {
      expiresIn: "7d",
    };
    return jwt.sign(payload, jwtSecret, options);
  }

  // ---------------------- Custom Middleware ---------------------- //

function validateUserContent(req, res, next) {
    if (!req.body.email || !req.body.password) {
      res
        .status(400)
        .json({ message: "Email & password fields are required." });
    } else {
      next();
    }
  }

module.exports = router;