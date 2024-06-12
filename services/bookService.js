const { Books } = require('../models/index');

const getAllBooks = async (count) => {
    try {
        if (count) {
            const books = await Books.find().sort({ createdAt: -1 }).limit(count);
            if (books == '') {
                return { success: false, data: null, message: 'Books not found' };
            }
            return { success: true, data: books, message: '' };
        } else {
            const books = await Books.find();
            if (books == '') {
                return { success: false, data: null, message: 'Books not found' };
            }
            return { success: true, data: books, message: '' };
        }
    } catch (err) {
        return { success: false, data: null, message: 'Books not found' };
    }
};

const getBookById = async (id) => {
    try {
        const book = await Books.findById(id);
        if (book) {
            return { success: true, data: book, message: '' };
        } else {
            return { success: false, data: null, message: 'Book not found' };
        }
    } catch (err) {
        return { success: false, data: null, message: err.message };
    }
};

const getBooksByCategory = async (category) => {
    try {
        const books = await Books.find({ category: category });
        if (books) {
            return { success: true, data: books, message: '' };
        } else {
            return { success: false, data: null, message: 'Book not found' };
        }
    } catch (err) {
        return { success: false, data: null, message: err.message };
    }
};

const getBooksByType = async (type, category, data) => {
    try {
        let query = {};

        if (type === 'author') {
            query.author = data;
        } else if (type === 'title') {
            query.title = data;
        } else {
            return { success: false, data: null, message: 'Invalid type' };
        }

        if (category) {
            query.category = category;
        }

        const books = await Books.find(query);

        if (books && books.length > 0) {
            return { success: true, data: books, message: '' };
        } else {
            return { success: false, data: null, message: 'Book not found' };
        }
    } catch (err) {
        return { success: false, data: null, message: err.message };
    }
};

const createBook = async (bookData) => {
    const book = new Books(bookData);
    try {
        const newBook = await book.save();
        return { success: true, data: newBook, message: '' };
    } catch (err) {
        return { success: false, data: null, message: err.message };
    }
};

const updateBook = async (id, bookData) => {
    try {
        const updatedBook = await Books.findByIdAndUpdate(id, bookData, { new: true });
        if (updatedBook) {
            return { success: true, data: updatedBook, message: '' };
        } else {
            return { success: false, data: null, message: 'Book not found' };
        }
    } catch (err) {
        return { success: false, data: null, message: err.message };
    }
};

const deleteBook = async (id) => {
    try {
        const book = await Books.findByIdAndDelete(id);
        if (book) {
            return { success: true, data: null, message: 'Book deleted' };
        } else {
            return { success: false, data: null, message: 'Book not found' };
        }
    } catch (err) {
        return { success: false, data: null, message: err.message };
    }
};

module.exports = { getAllBooks, getBookById, getBooksByCategory, getBooksByType, createBook, updateBook, deleteBook };
