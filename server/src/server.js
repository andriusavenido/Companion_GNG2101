/**
 * @file server.js
 * @description The main top level server file which sets up connections, routes, controllers, 
 *                 middleware, services, and database connections.
 * @requires express
 * @requires mongoose
 * 
 */

require('dotenv').config();

/**
 * Intialize Express application
 */
const express = require('express');
const app = express();

const mongoose = require('mongoose');
const database_URI = process.env.database_URI;

/**
 * Middleware to parse incoming JSON requests before sending to routes
 */
app.use(express.json());

/**
 * Import routes
 */
const userRoutes = require('./routes/users');
const conversationRoutes = require('./routes/conversations');
const openaiRoutes = require('./routes/openai');


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
app.use('/api/user',userRoutes);
app.use('/api/conversatoin',conversationRoutes);
app.use('/api/openai',openaiRoutes);


/**
 * Begin database connection, and then begin Express Server operations
 * @function
 * @param {number} PORT - The port number on which the server listens.
 */

const PORT = process.env.PORT || 4000;

mongoose.connect(database_URI)
    .then(() => {
        console.log('Connected to MongoDB');

        // Start the Express server only if the database connection is successful
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });
