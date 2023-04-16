// Ticket Routes

const express = require('express');
const ticketRoutes = express.Router();
const loggedIn = require('../../middleware/loggedIn');
const Ticket = require('./ticket');
const db = require("../../database/database");

// Get all tickets for the current user
ticketRoutes.get('/', loggedIn, async (req, res) => {
    const userId = req.session.userid;

    const sql = `
        SELECT tickets.id as ticketId, tickets.amount, tickets.purchased_on, movie_plays.movie_date, movies.title
        FROM tickets
        JOIN movie_plays ON tickets.movie_play_id = movie_plays.id
        JOIN movies ON movie_plays.movie_id = movies.id
        WHERE tickets.user_id = (SELECT id FROM users WHERE login = ?)
        ORDER BY tickets.purchased_on DESC
    `;

    db.all(sql, [userId], (err, rows) => {
        if (err) {
            res.status(500).json({ message: "An error occurred while fetching the tickets" });
        } else {
            res.status(200).json(rows);
        }
    });
});

// Save all confirmed orderStates as tickets in the database
ticketRoutes.post('/', loggedIn, async (req, res) => {
    let orderStates = req.session.orderStates;

    if (!orderStates) {
        res.redirect('/group42/cart');
        return;
    }

    if (orderStates.length === 0) {
        res.redirect('/group42/cart');
        return;
    }

    const user = await new Promise((resolve, reject) => {
        db.get('SELECT * FROM users WHERE login = ?', [req.session.userid], (err, row) => {
            if (!err) {
                resolve(row);
            } else {
                reject();
            }
        });
    });

    if (!user) {
        res.redirect('/group42/login');
        return;
    }

    const ticketPromises = [];

    orderStates.forEach(async (orderState) => {
        console.log(orderState)
        if (orderState.confirmed) {
            const ticket = new Ticket(user.id, orderState.movieId, orderState.movieDate, orderState.movieTime, orderState.numberOfTickets);
            ticketPromises.push(ticket.save());
        }
    });

    await Promise.all(ticketPromises);
    req.session.orderStates = await req.session.orderStates.filter((orderState) => !orderState.confirmed);

    res.redirect('/group42/thank-you');
});

module.exports = ticketRoutes;