const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:1EDEasYMYXnnBa0o@cluster0.uizr6l4.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

module.exports = { db }; // Export the app and the db connection
