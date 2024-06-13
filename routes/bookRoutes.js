// routes/bookRoutes.js
const express = require('express');
const { bookController } = require('../controllers/index');
const { authMiddleware } = require('../middlewares/index');

const router = express.Router();

router.post('/', authMiddleware.authenticateAdminToken, bookController.createBook);
router.put('/', authMiddleware.authenticateAdminToken, bookController.updateBook);
router.delete('/', bookController.deleteBook);

router.get('/', bookController.getAllBooks);
router.get('/:id', bookController.getBookById);

module.exports = router;
