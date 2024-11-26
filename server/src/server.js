require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');
const conversationRoutes = require('./routes/conversations');
const openaiRoutes = require('./routes/openai');

const app = express();
const database_URI = process.env.database_URI;

app.use(express.json());

mongoose.connect(database_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

/**
 * Logs the request path and method to the console for each incoming request.
 */
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

/**
 * Main Route Handlers
 */
app.use('/api/user', userRoutes);
app.use('/api/conversations', conversationRoutes);
app.use('/api/openai', openaiRoutes);