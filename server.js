// server.js
require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/index');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const { authRoutes, bookRoutes, userRoutes } = require('./routes/index');

connectDB();

const app = express();

app.use(
    cors({
        origin: ['https://book-store-client-rust.vercel.app', 'http://localhost:5173'],
        allowedHeaders: ['token', 'authorization', 'content-type'],
        credentials: true
    })
);

app.use(morgan('dev'));
// app.use(bodyParser.json());
app.use(bodyParser.json({ limit: '100mb' }));
app.use('/bookstore/api/auth', authRoutes);
app.use('/bookstore/api/books', bookRoutes);
app.use('/bookstore/api/users', userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
