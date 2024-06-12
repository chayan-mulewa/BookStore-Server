const { bookService } = require('../services/index');

const getAllBooks = async (req, res) => {
    try {
        const { count, type, category, data } = req.query;
        if (count !== undefined) {
            const result = await bookService.getAllBooks(count);
            if (result.success) {
                res.json(result.data);
            } else {
                res.json({ message: result.message });
            }
        } else if (type !== undefined) {
            console.log('cayan');
            const result = await bookService.getBooksByType(type, category, data);
            if (result.success) {
                res.json(result.data);
            } else {
                res.json({ message: result.message });
            }
        } else {
            res.status(400).json({ message: "Invalid query parameters." });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const getBookById = async (req, res) => {
    try {
        const result = await bookService.getBookById(req.params.id);
        if (result.success) {
            res.json(result.data);
        } else {
            res.status(404).json({ message: result.message });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const createBook = async (req, res) => {
    try {
        const result = await bookService.createBook(req.body);
        if (result.success) {
            res.status(201).json(result.data);
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const updateBook = async (req, res) => {
    try {
        const result = await bookService.updateBook(req.params.id, req.body);
        if (result.success) {
            res.json(result.data);
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const result = await bookService.deleteBook(req.params.id);
        if (result.success) {
            res.json({ message: result.message });
        } else {
            res.status(400).json({ message: result.message });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getAllBooks, getBookById, createBook, updateBook, deleteBook };
