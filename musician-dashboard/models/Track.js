const mongoose = require('mongoose');

const trackSchema = new mongoose.Schema({
    title: { type: String, required: true },
    genre: { type: String, required: true },
    releaseDate: { type: String, required: true },
    filePath: { type: String, required: true },
    coverPath: { type: String }
});

module.exports = mongoose.model('Track', trackSchema);
