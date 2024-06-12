const { userService } = require('../services/index');

const addToCart = async (req, res) => {
    try {
        const { bookId, userId } = req.body;
        const result = await userService.addToCart(bookId, userId);
        if (result.success) {
            res.status(201).json({ message: result.message });
        } else {
            res.status(409).json({ error: result.error, message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const removeToCart = async (req, res) => {
    try {
        const { cartId } = req.body;

        const result = await userService.removeToCart(cartId);
        if (result.success) {
            res.status(201).json({ message: result.message });
        } else {
            res.status(409).json({ error: result.error, message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const getMyDetails = async (req, res) => {
    try {
        const result = await userService.getMyDetails(req);
        if (result.success) {
            res.status(201).json({ data: result.data });
        } else {
            res.status(409).json({ error: result.error, message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { getMyDetails, addToCart, removeToCart };