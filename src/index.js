const express = require('express');
const mongoose = require('mongoose');
const swaggerSetup = require('./swagger');
const bookRoutes = require('./routes/book');
const memberRoutes = require('./routes/member');
const checkPenalty = require('./middlewares/checkPenalty');

const app = express();

app.use(express.json());

// Connect to MongoDB
mongoose
    .connect('mongodb://127.0.0.1:27017/library', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((error) => {
        console.error('Failed to connect to MongoDB:', error);
        process.exit(1);
    });

// Routes
app.use('/books', bookRoutes);
app.use('/members', checkPenalty, memberRoutes);

// Swagger API Documentation
swaggerSetup(app);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
