const mongoose = require('mongoose');

const questionsSchema = new mongoose.Schema({
    flavor: String,
    question: String,
    description: String
});

const Questions = mongoose.model('Questions', questionsSchema);

module.exports = Questions;
