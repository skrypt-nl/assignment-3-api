// User Routes

const express = require('express');
const userRoutes = express.Router();
const db = require("../../database/database");
const hash = require("../../utils/hash");
const { compare } = require("bcrypt");

userRoutes.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const from = req.body.from ?? null;

    try { 
        // Get the user with the give username from the database
        const user = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE login = ?', [username], (err, row) => {
                if (err) {
                    const errorMessage = encodeURIComponent('Email or password is incorrect');
                    res.redirect(`/group42/login?status=ERROR&message=${errorMessage}`);
                } else {
                    resolve(row);
                }
            });
        });

        // Return a general error when the user doesn't exist
        if (!user) {
            const errorMessage = encodeURIComponent('Email or password is incorrect');
            res.redirect(`/group42/login?status=ERROR&message=${errorMessage}`);
            return;
        }

        // Check the plain password against the hashed password in the database
        const correctPassword = await compare(password, user.password);

        if (!correctPassword) {
            const errorMessage = encodeURIComponent('Email or password is incorrect');
            res.redirect(`/group42/login?status=ERROR&message=${errorMessage}`);
            return;
        }

        const session = req.session;
        session.userid = user.login;

        res.redirect(from ?? '/group42/account');
    } catch (e) {
        console.log(e.message);
        const errorMessage = encodeURIComponent('Failed to authenticate user');
        res.redirect(`/group42/login?status=ERROR&message=${errorMessage}`);
    }
});

// Route to create a new user
userRoutes.post('/signup', async (req, res) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = await hash(req.body.password);
    const name = req.body.name;
    const address = req.body.address;
    const creditcard = req.body.creditcard;

    // Check if there isn't already an existing user with the provided username or email
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
        res.redirect(`/group42/signup?status=ERROR&message=${errorMessage}`);
        return;
    }

    db.run(
        'INSERT INTO users (name, email, login, password, address, credit_card) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, username, password, address, creditcard],
        function (err) {
            if (err) {
                const errorMessage = encodeURIComponent('Unexpected database error. Please try again.');
                res.redirect(`/group42/signup?status=ERROR&message=${errorMessage}`);
            } else {
                const message =  encodeURIComponent('Your account was created successfully. Please sign in to continue.');
                res.redirect(`/group42/login?status=SUCCESS&message=${message}`);
            }
        }
    );
});

// Route to get the details from the authenticated user
userRoutes.get('/', async (req, res) => {
    const username = req.session.userid;

    try {
        const user = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE login = ?', [username], (err, row) => {
                if (!err) {
                    resolve(row);
                }
            });
        });

        if (!user) {
            res.status(404).json({'message': 'User not found'});
            return;
        }

        // Hide the password on the front-end
        delete user.password;

        // Mask the credit card number
        user.credit_card = user.credit_card.replace(/(\d{4})(?=\d{4})/g, "**** ");
        
        res.status(200).json(user);
    } catch (e) {
        console.error(e.message);
        res.status(403).json({message: 'Something went wrong'});
    }
});

module.exports = userRoutes;