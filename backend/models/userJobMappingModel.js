
const mongoose = require('mongoose');

const userJobMappingSchema = new mongoose.Schema({

    jobId: {
        type: String,
        required: [true, 'jobId is required'],
    },
    userId: {
        type: String,
        required: [true, 'userId is required'],
    }

}, { timestamps: true })

module.exports = mongoose.model("UserJobMapping", userJobMappingSchema);