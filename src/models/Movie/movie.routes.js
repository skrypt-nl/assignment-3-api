const express = require('express');
const movieRoutes = express.Router();
const movieHandlers = require('./movie.handlers');

movieRoutes.get('/', movieHandlers.get);
// movieRoutes.get('/:id', movieHandlers.read);

module.exports = movieRoutes;