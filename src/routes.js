// File responsible for putting all routes together.

const express = require('express');
const getRoutes = require('./utils/getRoutes');
const routes = express.Router();
const path = require('path');
const loggedIn = require("./middleware/loggedIn");
const isGuest = require("./middleware/isGuest");

routes.use('/api/movies', getRoutes('movie'));
routes.use('/user', getRoutes('user'));
routes.use('/tickets', getRoutes('ticket'));

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
        res.redirect('/group42/login')
    })
});

routes.get('/account', loggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../www/account.html'));
});

routes.get('/order/:id', loggedIn, (req, res) => {
    res.sendFile(path.join(__dirname, '../www/order.html'));
});

routes.post('/order/:id', loggedIn, async (req, res) => {
    let orderStates = req.session.orderStates;

    if (!orderStates) {
        req.session.orderStates = [];
        orderStates = [];
    }

    let stateIndex = await req.session.orderStates.findIndex((state) => (state.movieId === req.params.id && !state.confirmed));

    if (stateIndex > -1) {
        req.session.orderStates[stateIndex].confirmed = true;
    } else {
        res.redirect(`/group42/order/${req.params.id}`);
        return;
    }

    res.redirect('/group42/cart');
});

module.exports = routes;
