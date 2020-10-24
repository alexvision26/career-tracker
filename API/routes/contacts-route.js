const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secrets");
const mongoose = require("mongoose");
const { User } = require("../models/schema");

//Test route...
router.get("/", (req, res) => {
    res.status(200).json({ message: "Contacts route working..." })
})


// CREATE NEW CONTACT ON EXISTING JOB

router.post("/", (req, res) => {
    // ID of Job AND User must be passed in the Request Body to save Contact to Job and User. This will save contact info even if Job is deleted.
    // Contact needs to also be attached to the User under Contacts array, doesn't need to point to job exactly, should just reference company
    // If job is deleted, the contact should stay under the User's Contacts array as a subdocument
})

// RETRIEVE ALL CONTACTS IN RECORD BOOK

router.get("/:id", (req, res) => {

})

// RETRIEVE ALL CONTACTS FROM JOB

router.get("/:id/job", (req, res) => {
    const id = req.params.id;
    const jobId = req.body._id

    //Needs to pull all contacts from a Job post.
})

// RETRIEVE SINGLE CONTACT

router.get("/:id/info", (req, res) => {
    // Should pull this information from Record book. Can be the same request as pulling one contact from list of contacts under a single job
})

// EDIT CONTACT INFORMATION

router.put("/:id", (req, res) => {
    // ID Param must be User ID. ID Param of job must also be passed in REQUEST body to update record.
    // This needs to simultaneously update the JOB->CONTACT record and also the USER->CONTACT record.
    // Same ops for deleting a record.
})

// DELETE CONTACT INFORMATION (NEEDS TO DELETE ON JOB-CONTACT AND USER->CONTACT)

router.delete("/:id", (req, res) => {
    // Same as PUT... See above.
})

