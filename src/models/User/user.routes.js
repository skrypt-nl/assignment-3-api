const express = require('express');
const userRoutes = express.Router();
const db = require("../../database/database");
const hash = require("../../utils/hash");

userRoutes.post('/login', async (req, res) => {
    const email = req.body.email;
    const password = await hash(req.body.password);

    db.get(
        'SELECT * FROM users WHERE email = ? AND password = ?',
        [email, password],
        function (err, row) {
            if (err) {
                console.log(err.message);
                res.status(500).send('Failed to authenticate user');
            } else if (!row) {
                console.log('Email or password is incorrect');
                res.status(401).send('Email or password is incorrect');
            } else {
                console.log('User authenticated successfully');
                res.status(200).send('User authenticated successfully');
            }
        }
    );
});

userRoutes.post('/signup', async (req, res) => {
    console.log(req);
    console.log(req.body);
    const username = req.body.username;
    const email = req.body.email;
    const password = await hash(req.body.password);
    const name = req.body.name;
    const address = req.body.address;

    db.run(
        'INSERT INTO users (name, email, login, password, address) VALUES (?, ?, ?, ?, ?)',
        [name, email, username, password, address],
        function (err) {
            if (err) {
                console.log(err.message);
                res.status(500).send('Failed to register user');
            } else {
                console.log(`A new user has been created with ID ${this.lastID}`);
                res.status(200).send('User registered successfully');
            }
        }
    );
});

module.exports = userRoutes;