const express = require('express');
const getRoutes = require('./utils/getRoutes');
const routes = express.Router();
const path = require('path');

routes.use('/api/movies', getRoutes('movie'));
routes.use('/user', getRoutes('user'));

routes.use('/movie/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../www/movie.html'));
})

module.exports = routes;
