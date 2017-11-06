// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const DBInitializer = require('./server/db/db_initializer');
const environment = process.env.ENV
// Get our API routes
const api = require('./server/api/api');

const app = express();

// Adds log of every request
app.use(morgan('combined'));

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);

// Catch all other routes and return the index file
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/*
 * Initializes DB
*/
new DBInitializer().initialize();

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`Shared server running on localhost:${port}...`));

module.exports = server;