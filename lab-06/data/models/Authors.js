const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AuthorSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    }
}, {timestamps: true});

const AuthorModel = mongoose.model('Authors', AuthorSchema);

module.exports = AuthorModel;
