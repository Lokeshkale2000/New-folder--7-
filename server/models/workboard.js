const mongoose = require('mongoose');

const workboardSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    visibility: {
        type: String,
        enum: ['public', 'private'], // Allow only 'public' or 'private'
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Workboard = mongoose.model('Workboard', workboardSchema);

module.exports = Workboard;
