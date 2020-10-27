const router = require("express").Router();
const mongoose = require("mongoose");
const { User, Contact } = require("../models/schema");

// CREATE NEW CONTACT ON EXISTING JOB

router.post("/", (req, res) => {
    const contact = new Contact({
        _id: new mongoose.Types.ObjectId,
        authorId: req.body.authorId,
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email,
        role: req.body.role,
        company: req.body.company,
    })

    const query = { _id: req.body.authorId }

    User.updateOne(query, { $push: { contacts: contact }}).then(result => {
        console.log(result)
        res.status(201).json({ message: "Contact added successfully!" })
    }).catch(err => {
        console.log(err)
        res.status(500).json({ error: err })
    })
})

// RETRIEVE ALL CONTACTS IN RECORD BOOK

router.get("/:id", (req, res) => {
    const id = req.params.id;

    User.findOne({ _id: id }).then(doc => {
        res.status(200).json(doc.contacts)
    }).catch(err => {
        res.status(500).json(err)
    })
})

// RETRIEVE ALL CONTACTS FROM JOB

router.get("/:id/job", (req, res) => {
    const id = req.params.id;

    //Needs to pull all contacts from a Job post.
    User.findOne({ _id: id }).then(doc => {
        // console.log(doc)
        const matchContacts = doc.contacts.filter(el => {
            return el.company.toUpperCase() === req.body.company.toUpperCase()
        })
        console.log(matchContacts)
        res.status(200).json(matchContacts)
    }).catch(err => res.status(500).json(err))
})

// RETRIEVE SINGLE CONTACT

router.get("/:id/info", (req, res) => {
    const id = req.params.id;
    const contactId = req.body._id;

    User.findOne({ _id: id }).then(doc => {
        const matchContact = doc.contacts.filter(el => {
            return el._id.toString() === contactId
        })
        res.status(200).json(matchContact)
    }).catch(err => res.status(500).json(err))
})

// EDIT CONTACT INFORMATION

router.put("/:id", (req, res) => {
    const id = req.params.id;
    const contactId = req.body._id;

    User.findOne({ _id: id }).then(doc => {
        const matchContact = doc.contacts.filter(el => {
            return el._id.toString() === contactId
        })
        matchContact[0].set(req.body)
        doc.save().then(result => {
            res.status(200).json({ message: "Successfully edited job.", res: result })
        }).catch(err => {
            // console.log(err)
            res.status(500).json({ message: "Error editing contact." })
        })
    }).catch(err => res.status(500).json(err))
})

// DELETE CONTACT INFORMATION (NEEDS TO DELETE ON JOB-CONTACT AND USER->CONTACT)

router.delete("/:id", (req, res) => {
    const id = req.params.id;
    const contactId = req.body._id;

    User.findOne({ _id: id }).then(doc => {
        const matchContact = doc.contacts.filter(el => {
            return el._id.toString() === contactId
        })
        matchContact[0].remove();

        doc.save().then(result => {
            res.status(200).json({ message: "Successfully deleted contact." })
        }).catch(err => {
            // console.log(err)
            res.status(500).json({ message: "Error deleting contact." })
        })
    })
})

module.exports = router
