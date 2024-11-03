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
 * Logs the request path and method to the console for each incoming request.
 * @function
 * @param {Object} req - The request object.
 * @param {string} req.path - The path of the incoming request.
 * @param {string} req.method - The HTTP method of the incoming request.
 * @param {Object} res - The response object.
 * @param {function} next - The next middleware function in the stack.
 * @returns {void} Passes control to the next middleware function.
 */
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

/**
 * Main Route Handlers
 */


/**
 * Begin database connection, and then begin Express Server operations
 * @function
 * @param {number} PORT - The port number on which the server listens.
 */

const PORT = process.env.PORT || 3000;

mongoose.connect(database_URI, { useNewUrlParser: true, useUnifiedTopology: true })
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
