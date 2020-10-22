const router = require("express").Router();
const mongoose = require("mongoose");
const { User, Job } = require("../models/schema");

router.get('/', (req, res) => {
    res.status(200).json({ api: "Jobs router working "})
})

// ADD A NEW JOB CARD
router.post("/", (req, res) => {
    const job = new Job({
        _id: new mongoose.Types.ObjectId,
        authorEmail: req.body.authorEmail,
        jobTitle: req.body.jobTitle,
        company: req.body.company,
        desc: req.body.desc,
        location: req.body.location,
        postUrl: req.body.postUrl,
        status: req.body.status,
        deadline: req.body.deadline
    })

    const query = { email: req.body.authorEmail }

    User.updateOne(query, { $push: { jobs: job }}).then(result => {
        // console.log(result)
        res.status(201).json({ message: "Successfull added a job card!" })
    }).catch(err => {
        // console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router;