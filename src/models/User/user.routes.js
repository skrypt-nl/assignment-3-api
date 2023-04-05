const express = require('express');
const userRoutes = express.Router();

userRoutes.post('/login', async (req, res) => {
    console.log(req.body);
    res.json(req.body);
});

userRoutes.post('/signup', async (req, res) => {
    res.json(req.body);
});

module.exports = userRoutes;