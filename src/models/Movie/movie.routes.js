// Movie Routes

const express = require('express');
const movieRoutes = express.Router();
const db = require("../../database/database");
const Movie = require("./movie");

// Retrieve all movies from the database, with pagination options
movieRoutes.get('/', async (req, res) => {
    const resultsPerPage = 10;
    const page = !isNaN(req.query.p) ? req.query.p : 1;
    const offset = resultsPerPage * (page - 1);
    const sql = `SELECT id FROM movies ORDER BY id ASC LIMIT ? OFFSET ?`;

    // Use a promises array to fetch all movies individually
    let moviePromises = [];

    await new Promise((resolve, reject) => {
        db.each(sql, [resultsPerPage, offset], (err, row) => {
            if (err) {
                reject(err);
            } else {
                const movie = new Movie(row.id);
                moviePromises.push(movie.fetch());
            }
        }, (err, num) => {
            if (err) {
                reject(err);
            } else {
                resolve(num);
            }
        });
    });

    // Wait for all movies to be fetched
    const movies = await Promise.all(moviePromises);

    res.json(movies);
});

// Retrieve all states that are added to the cart
movieRoutes.get('/orderStates', async (req, res) => {
    const orderStates = await req.session.orderStates;

    if (!orderStates) {
        res.status(200).json([]);
        return;
    }

    const confirmedOrders = orderStates.filter((orderState) => orderState.confirmed);

    const moviePromises = [];

    confirmedOrders.forEach((confirmedOrder) => {
        const movie = new Movie(confirmedOrder.movieId);
        moviePromises.push(movie.fetch());
        confirmedOrder.movie = movie;
    })

    await Promise.all(moviePromises);

    res.status(200).json(confirmedOrders);
});

// Retrieve a movie
movieRoutes.get('/:id', async (req, res) => {
    const movie = new Movie(req.params.id);
    await movie.fetch();

    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

// Retrieve the moviePlays for a movie
movieRoutes.get('/:id/plays', async (req, res) => {
    const movie = new Movie(req.params.id);

    await movie.fetch();

    if (movie) {
        res.json(await movie.getMoviePlays(req.query.date ?? null));
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

// Retrieve the orderState for a movie
movieRoutes.get('/:id/orderState', async (req, res) => {
    const orderStates = await req.session.orderStates;

    if (!orderStates) {
        res.status(404).json({ message: 'Empty state' });
        return;
    }

    const state = await orderStates.find((state) => (state.movieId === req.params.id && !state.confirmed));

    if (!state) {
        res.status(404).json({ message: 'Empty state' });
    } else {
        res.status(200).json(state);
    }
});

// Save the orderState for a movie
movieRoutes.post('/:id/orderState', async (req, res) => {
    let orderStates = req.session.orderStates;

    if (!orderStates) {
        req.session.orderStates = [];
        orderStates = [];
    }

    const newState = {
        movieId: req.params.id,
        numberOfTickets: req.body.numberOfTickets,
        movieDate: req.body.movieDate,
        movieTime: req.body.movieTime,
        confirmed: false
    };

    // Check if the movie already has a saved state in the current session
    let currentStateIndex = await req.session.orderStates.findIndex((state) => (state.movieId === req.params.id && !state.confirmed));

    if (currentStateIndex > -1) {
        // When the movieData changes, set the movieTime to the first time of this date
        if (req.session.orderStates[currentStateIndex].movieDate !== newState.movieDate) {
            const movie = new Movie(req.params.id);
            await movie.fetch();

            const moviePlays = await movie.getMoviePlays(newState.movieDate);
            newState.movieTime = moviePlays[0].date.slice(11);
        }

        // Update the existing state in the session
        req.session.orderStates[currentStateIndex] = newState;
    } else {
        // Add the state to the session
        await req.session.orderStates.push(newState);
    }

    res.status(200).json({ message: 'Order state updated' });
});

module.exports = movieRoutes;