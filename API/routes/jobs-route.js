const router = require("express").Router();
const mongoose = require("mongoose");
const { User, Job } = require("../models/schema");

router.get('/', (req, res) => {
    res.status(200).json({ api: "Jobs router working "})
})

router.post("/", (req, res) => {
    const job = new Job({
        author: req.body.author,
        authorId: req.body.authorId,
        jobTitle: req.body.jobTitle,
        company: req.body.company,
        desc: req.body.desc,
        location: req.body.location,
        postUrl: req.body.postUrl,
        status: req.body.status,
        deadline: req.body.deadline
    })

    job.save().then(result => {
        console.log(result)
        res.status(201).json({ message: "Job card successfully added." })
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router;