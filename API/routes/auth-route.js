const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const { User } = require("../models/schema");

// REGISTER ACCOUNT

router.post('/register', validateUserContent, (req, res) => {
    let user = new User({
        _id: new mongoose.Types.ObjectId,
        email: req.body.email,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname,
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
            console.log(result)
            const token = generateToken(result)

            res.status(200).json({
                message: `Welcome, ${result.fname}!`,
                info: {
                  id: result._id,
                  first: result.fname,
                  last: result.lname,
                  email: result.email,
                  industry: result.industry,
                  created: result.created,
                  token: token
                }

            });
        } else {
            res.status(401).json({ message: "Invalid credentials" })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

// GET ACCOUNT INFO

// router.get("/:id", (req, res) => {
//   const id = req.params.id;

//   User.findOne({ _id: id }).then(doc => {
//     res.status(200).json({ user: {
//       fname: doc.fname,
//       lname: doc.lname,
//       email: doc.email,
//       industry: doc.industry,
//       created: doc.created.toDateString()
//     } })
//   }).catch(err => {
//     res.status(500).json(err)
//   })
// })

// ---------------------- Generate Token ---------------------- //

function generateToken(user) {
    const payload = {
      sub: user._id, // standard claim = sub
      username: user.email,
    };
    const options = {
      algorithm: "HS256",
      expiresIn: "7d"
    };
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
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