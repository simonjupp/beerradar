const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    beerId: String,
    date: Date,
    userName: String,
    comment: String,
    tastingResults: [ {question: { type: mongoose.Schema.Types.ObjectId, ref: 'Questions' }, rating: Number} ]
});

const Tasting = mongoose.model('Tasting', ratingSchema);

module.exports = Tasting;
