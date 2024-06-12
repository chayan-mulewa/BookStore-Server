const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { Users, Admins } = require('../models/index');
const { JWT_SECRET, ADMIN_SECRET_CODE } = process.env;

const signup = async (full_name, email, username, password, role, secretKey) => {
    try {
        let existingUsername;

        existingUsername = await Users.findOne({ username });
        if (existingUsername) {
            return { success: false, error: 'username', message: 'Username is already taken', data: '' };
        }

        existingUsername = await Admins.findOne({ username });
        if (existingUsername) {
            return { success: false, error: 'username', message: 'Username is already taken', data: '' };
        }

        let existingEmail;

        existingEmail = await Users.findOne({ email });
        if (existingEmail) {
            return { success: false, error: 'email', message: 'Email is already taken', data: '' };
        }

        existingEmail = await Admins.findOne({ email });
        if (existingEmail) {
            return { success: false, error: 'email', message: 'Email is already taken', data: '' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        if (role === 'admin') {
            if (secretKey == ADMIN_SECRET_CODE) {
                const admin = new Admins({ full_name, email, username, password: hashedPassword });
                await admin.save();
            } else {
                return { success: false, error: 'admin', message: 'Access denied', data: '' };
            }
        } else {
            const user = new Users({ full_name, email, username, password: hashedPassword });
            await user.save();
        }

        return { success: true, error: '', message: 'User is created', data: '' };
    } catch (error) {
        return { success: false, error: 'server', message: 'Internal server error', data: '' };
    }
};

const signin = async (username, password, role) => {
    try {
        let user;
        if (role === 'admin') {
            user = await Admins.findOne({ username });
        } else {
            user = await Users.findOne({ username });
        }

        if (!user) {
            return { success: false, error: 'username', message: 'Username is invalid', data: '' };
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return { success: false, error: 'password', message: 'Password is invalid', data: '' };
        }

        const tokenPayload = { userId: user._id, role };

        if (role === 'admin') {
            const token = jwt.sign(tokenPayload, `${JWT_SECRET}-${ADMIN_SECRET_CODE}`, { expiresIn: '30d' });
            return { success: true, error: '', message: '', data: token };
        } else {
            const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '30d' });
            return { success: true, error: '', message: '', data: token };
        }
    } catch (error) {
        return { success: false, error: 'server', message: 'Internal server error', data: '' };
    }
};

const validateToken = async (req) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return { success: false, error: 'token', message: 'Invalid credentials', data: token };
    }

    const token = authHeader.split(' ')[1];

    try {
        const decodeToken = await jwt.verify(token, JWT_SECRET);
        const userId = decodeToken.userId;
        return { success: true, error: '', message: '', data: userId };
    } catch (error) {
        try {
            const decodeToken = await jwt.verify(token, `${JWT_SECRET}-${ADMIN_SECRET_CODE}`);
            const userId = decodeToken.userId;
            return { success: true, error: '', message: '', data: userId };
        } catch (error) {
            return { success: false, error: 'token', message: 'Invalid credentials', data: '' };
        }
    }
};

module.exports = { signup, signin, validateToken };
