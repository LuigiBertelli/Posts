const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Title is required',
        trim: true,
        minLength: 4,
        maxLength: 150,
    },
    body: {
        type: String,
        required: 'Body is required',
        trim: true,
        minLength: 4,
        maxLength: 1500,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: new Date(),
    },
});

module.exports = mongoose.model('Post', postSchema);