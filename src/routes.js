const express = require('express');
const getRoutes = require('./utils/getRoutes');
const routes = express.Router();
const path = require('path');
const loggedIn = require("./middleware/loggedIn");
const isGuest = require("./middleware/isGuest");

routes.use('/api/movies', getRoutes('movie'));
routes.use('/user', getRoutes('user'));

routes.get('/movie/:id', (req, res) => {
    res.sendFile(path.join(__dirname, '../www/movie.html'));
});

routes.get('/login', isGuest, (req, res) => {
    res.sendFile(path.join(__dirname, '../www/login.html'));
});

routes.get('/signup', isGuest, (req, res) => {
    res.sendFile(path.join(__dirname, '../www/signup.html'));
});

routes.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect('/login')
    })
});

routes.get('/account', loggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../www/account.html'));
});

module.exports = routes;
