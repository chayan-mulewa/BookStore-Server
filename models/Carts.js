// models/Carts.js
const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
    bookId: { type: String, required: true },
    userId: { type: String, required: true }
}, { versionKey: false });

const Carts = mongoose.model('carts', CartSchema);

module.exports = Carts;
