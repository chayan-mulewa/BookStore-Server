// controllers/authController.js
const { authService } = require('../services/index');

const signup = async (req, res) => {
    try {
        const { full_name, email, username, password, role, secretKey } = req.body;
        const result = await authService.signup(full_name, email, username, password, role, secretKey);
        if (result.success) {
            res.status(201).json({ message: result.message });
        } else {
            if (result.error === 'username' || result.error === 'email' || result.error === 'admin') {
                res.status(409).json({ error: result.error, message: result.message });
            } else {
                res.status(500).json({ message: 'Internal server error' });
            }
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const signin = async (req, res) => {
    try {
        const { username, password, role } = req.body;
        const result = await authService.signin(username, password, role);
        if (result.success) {
            res.json({ token: result.data });
        } else {
            res.status(401).json({ error: result.error, message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

const validateToken = async (req, res) => {
    try {
        const result = await authService.validateToken(req);
        if (result.success) {
            res.status(200).json({ message: 'Valid token' });
        } else {
            res.status(401).json({ error: result.error, message: result.message });
        }
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { signup, signin, validateToken };
