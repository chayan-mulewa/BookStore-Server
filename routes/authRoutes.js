// routes/auth.js
const express = require('express');
const { authController } = require('../controllers/index');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/signin', authController.signin);
router.get('/validateToken', authController.validateToken);

module.exports = router;
