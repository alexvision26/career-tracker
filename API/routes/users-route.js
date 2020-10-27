const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secrets");
const mongoose = require("mongoose");
const { User } = require("../models/schema");

router.get('/', (req, res) => {
    res.status(200).json({ api: "Users router working "})
})

// EDIT ACCOUNT DETAILS

router.put("/:id", (req, res) => {
    const id = req.params.id

    delete req.body.email
  
    User.findOneAndUpdate({ _id: id }, req.body).then(doc => {
      res.status(200).json({ message: "Account updated successfully. "})
    }).catch(err => {
      res.status(500).json({ error: err })
    })
  })
  
  // DELETE ACCOUNT
  // MUST SEND EMAIL & PASS TO DELETE ACCOUNT
  
router.delete("/:id", validateUserContent, (req, res) => {
    const id = req.params.id
    let { email, password } = req.body;

    User.findOne({ email: email }).then(result => {
        if (result && bcrypt.compareSync(password, result.password)) {

        User.findOneAndDelete({ _id: id }).then(result => {
            console.log(result)
            res.status(201).json({ message: "Account deleted." })
        }).catch(err => {
            res.status(500).json({ error: err })
        })
        } else {
        res.status(401).json({ error: "Invalid credentials." })
        }
    }).catch(err => {
        res.status(500).json({ error: "Error finding user." })
    })

})

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