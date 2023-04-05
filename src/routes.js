const express = require('express');
const getRoutes = require('./utils/getRoutes');
const routes = express.Router();

routes.use('/movies', getRoutes('movie'));
routes.use('/user', getRoutes('user'));

module.exports = routes;
