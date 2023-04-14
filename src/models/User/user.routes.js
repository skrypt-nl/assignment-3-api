const express = require('express');
const userRoutes = express.Router();
const db = require("../../database/database");
const hash = require("../../utils/hash");
const { compare } = require("bcrypt");

userRoutes.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE login = ?', [username], (err, row) => {
                if (err) {
                    const errorMessage = encodeURIComponent('Email or password is incorrect');
                    res.redirect(`/login?status=ERROR&message=${errorMessage}`);
                } else {
                    resolve(row);
                }
            });
        });

        if (!user) {
            const errorMessage = encodeURIComponent('Email or password is incorrect');
            res.redirect(`/login?status=ERROR&message=${errorMessage}`);
            return;
        }

        const correctPassword = await compare(password, user.password);

        if (!correctPassword) {
            const errorMessage = encodeURIComponent('Email or password is incorrect');
            res.redirect(`/login?status=ERROR&message=${errorMessage}`);
            return;
        }

        const session = req.session;
        session.userid = req.body.username;

        res.redirect('/account');
    } catch (e) {
        console.log(e.message);
        const errorMessage = encodeURIComponent('Failed to authenticate user');
        res.redirect(`/login?status=ERROR&message=${errorMessage}`);
    }
});

userRoutes.post('/signup', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = await hash(req.body.password);
    const name = req.body.name;
    const address = req.body.address;

    const userExists = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE login = ? OR email = ?', [username, email], (err, row) => {
            if (err) {
                reject(err);
            } else {
                resolve(row);
            }
        });
    });

    if (userExists) {
        const errorMessage = encodeURIComponent('Email or username already taken');
        res.redirect(`/signup?status=ERROR&message=${errorMessage}`);
        return;
    }

    db.run(
        'INSERT INTO users (name, email, login, password, address) VALUES (?, ?, ?, ?, ?)',
        [name, email, username, password, address],
        function (err) {
            if (err) {
                const errorMessage = encodeURIComponent('Unexpected database error. Please try again.');
                res.redirect(`/signup?status=ERROR&message=${errorMessage}`);
            } else {
                const message =  encodeURIComponent('Your account was created successfully. Please sign in to continue.');
                res.redirect(`/login?status=SUCCESS&message=${message}`);
            }
        }
    );
});

module.exports = userRoutes;