const jwt = require('jsonwebtoken');
const { Users, Admins, Carts, Books } = require('../models/index');
const { JWT_SECRET, ADMIN_SECRET_CODE } = process.env;

const addToCart = async (bookId, userId) => {
    try {
        const cart = new Carts({ bookId, userId });
        await cart.save();
        return { success: true, error: '', message: 'Book Added To Cart', data: '' };
    } catch (error) {
        console.log(error)
        return { success: false, error: 'cart', message: 'Book Does Not Added to Cart', data: '' };
    }
};

const removeToCart = async (cartId) => {
    try {
        const cart = await Carts.findByIdAndDelete(cartId);
        return { success: true, error: '', message: 'Book Removed To Cart', data: '' };
    } catch (error) {
        console.log(error)
        return { success: false, error: 'cart', message: 'Book Does Not Removed to Cart', data: '' };
    }
};

const getMyDetails = async (req) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { success: false, error: 'token', message: 'Invalid credentials', data: token };
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodeToken = await jwt.verify(token, JWT_SECRET);
        const userId = decodeToken.userId;
        const user = await Users.findById(userId).lean();
        const carts = await Carts.find({ userId });
        const booksPromises = carts.map(async (data, index) => {
            const bookId = data.bookId;
            const book = await Books.findById(bookId);
            const userWithCarts = { book: book, cartId: data._id };
            return userWithCarts;
        });
        const books = await Promise.all(booksPromises);
        const userWithCarts = { ...user, books: books, role: 'user' };
        return { success: true, error: '', message: '', data: userWithCarts };
    } catch (error) {
        try {
            const decodeToken = await jwt.verify(token, `${JWT_SECRET}-${ADMIN_SECRET_CODE}`);
            const userId = decodeToken.userId;
            const user = await Admins.findById(userId).lean();
            const carts = await Carts.find({ userId });
            const booksPromises = carts.map(async (data, index) => {
                const bookId = data.bookId;
                const book = await Books.findById(bookId);
                const userWithCarts = { book: book, cartId: data._id };
                return userWithCarts;
            });
            const books = await Promise.all(booksPromises);
            const userWithCarts = { ...user, books: books, role: 'admin' };
            return { success: true, error: '', message: '', data: userWithCarts };
        } catch (error) {
            return { success: false, error: 'token', message: 'Invalid credentials', data: '' };
        }
    }
};

module.exports = { addToCart, removeToCart, getMyDetails };