const mongoose = require('mongoose');

const activitySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    created: { type: Date, default: Date.now },
    author: { type: String, required: true },
    authorId: { type: String, required: true },

    title: { type: String, required: true },
    actions: Array,

})

const contactSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    created: { type: Date, default: Date.now },
    author: { type: String, required: true },
    authorId: { type: String, required: true },

    name: { type: String, required: true },
    phone: Number,
    email: String,
    role: String,
    company: String,

    actions: [activitySchema],
})

const jobSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    created: { type: Date, default: Date.now },
    author: { type: String, required: true },
    authorId: { type: String, required: true },
    jobTitle: { type: String, required: true },
    company: { type: String, required: true },
    desc: {type: String, required: true },
    location: String,
    postUrl: String,
    status: String,
    deadline: Date,

    contacts: [contactSchema]
})

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    created: { type: Date, default: Date.now },
    name: { type: String, required: true },
    industry: String,

    //Nested subdocuments attached to each user. Need to contain the ID of the user that created them
    jobs: [jobSchema],
    contacts: [contactSchema],
    activities: [activitySchema],
})

const User = mongoose.model("User", userSchema)
const Job = mongoose.model("Job", userSchema)
const Contact = mongoose.model("Contact", userSchema)
const Activity = mongoose.model("Activity", userSchema)

module.exports = {
    User: User,
    Job: Job,
    Contact: Contact,
    Activity: Activity
}