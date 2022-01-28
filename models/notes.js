const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    _id: { type: String, required: true },
}, { collection: 'notes', versionKey: false });

module.exports = mongoose.model('notes', noteSchema);