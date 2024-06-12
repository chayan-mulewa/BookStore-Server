// models/Book.js
const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    photo: { type: String, required: true },
    price: { type: Number, required: true },
    // createdAt: { type: Date, default: Date.now },
}, { versionKey: false });

const Book = mongoose.model('books', BookSchema);

module.exports = Book;
