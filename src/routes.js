const express = require('express');
const getRoutes = require('./utils/getRoutes');
const routes = express.Router();

routes.use('/movies', getRoutes('movie'));

module.exports = routes;
