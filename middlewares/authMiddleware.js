// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const { JWT_SECRET, ADMIN_SECRET_CODE } = process.env;
const { Users } = require('../models/index');

const authenticateUserToken = async (req, res, next) => {

  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await jwt.verify(token, JWT_SECRET);
    const user = await Users.findById(decoded.userId).select('-password');
    if (!user) {
      throw new Error();
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

const authenticateAdminToken = async (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization token is required' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = await jwt.verify(token, `${JWT_SECRET}-${ADMIN_SECRET_CODE}`);
    if (decoded.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin privileges required' });
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error)
    return res.status(401).json({ message: 'Invalid token' });
  }
};

module.exports = { authenticateUserToken, authenticateAdminToken };
