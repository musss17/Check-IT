const mongoose = require('mongoose');

const studyplanSchema = new mongoose.Schema({
    _id: { type: String, required: true },
}, { collection: 'notes', versionKey: false });

module.exports = mongoose.model('studyplan', studyplanSchema);