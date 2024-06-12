// routes/auth.js
const express = require('express');
const { userController } = require('../controllers/index');
const {authMiddleware} = require('../middlewares/index');

const router = express.Router();

router.post('/cart', userController.addToCart);
router.delete('/cart', userController.removeToCart);
router.get('/details', userController.getMyDetails);

module.exports = router;
