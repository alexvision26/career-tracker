const router = require("express").Router();
const mongoose = require("mongoose");
const { User, Job } = require("../models/schema");

/*------------------END POINTS------------------------ */

router.get("/", (req, res) => {
    res.status(200).json({ api: "Jobs route with JWT working." })
})

// GET ALL JOBS BY USER

router.get("/:id", (req, res) => {
    const id = req.params.id;

    User.findOne({ _id: id }).then(doc => {
        res.status(200).json({
            jobs: doc.jobs
        })
    }).catch(err => {
        res.status(500).json({ message: "Error retrieving jobs.", error: err })
    })
})

// GET SINGLE JOB
router.get("/:id/job", (req, res) => {
    const id = req.params.id;
    const jobId = req.body._id

    User.findOne({ _id: id }).then(doc => {
        const theJob = doc.jobs.filter(job => {
            return job._id.toString() === jobId
        })
        res.status(200).json({
            job: theJob[0]
        })
    }).catch(err => {
        res.status(500).json({ message: "Error retrieving job.", error: err })
    })
})

// ADD A NEW JOB CARD
router.post("/", (req, res) => {
    const job = new Job({
        _id: new mongoose.Types.ObjectId,
        authorId: req.body.authorId,
        jobTitle: req.body.jobTitle,
        company: req.body.company,
        desc: req.body.desc,
        location: req.body.location,
        postUrl: req.body.postUrl,
        status: req.body.status,
        deadline: req.body.deadline
    })

    const query = { _id: req.body.authorId }

    User.updateOne(query, { $push: { jobs: job }}).then(result => {
        // console.log(result)
        res.status(201).json({ message: "Successfull added a job card!" })
    }).catch(err => {
        // console.log(err)
        res.status(500).json(err)
    })
})

// EDIT A JOB CARD
router.put("/:id", (req, res) => {
    const id = req.params.id;
    const jobId = req.body._id

    User.findOne({ _id: id }).then(doc => {
        const theJob = doc.jobs.filter(job => {
            return job._id.toString() === jobId
        })
        theJob[0].set(req.body)
        doc.save().then(result => {
            res.status(200).json({ message: "Successfully edited job." })
        }).catch(err => {
            // console.log(err)
            res.status(500).json({ message: "Error updating job." })
        })
    })
})

// DELETE A JOB CARD
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const jobId = req.body._id;

    User.findOne({ _id: id }).then(doc => {
        // console.log(doc)
        const theJob = doc.jobs.filter(job => {
            return job._id.toString() === jobId
        })
        theJob[0].remove();

        doc.save().then(result => {
            res.status(200).json({ message: "Successfully deleted job." })
        }).catch(err => {
            // console.log(err)
            res.status(500).json({ message: "Error deleting job." })
        })
    })
})

module.exports = router;