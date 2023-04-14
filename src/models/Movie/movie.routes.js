const express = require('express');
const movieRoutes = express.Router();
const db = require("../../database/database");
const Movie = require("./movie");

movieRoutes.get('/', async (req, res) => {
    const resultsPerPage = 10;
    const page = !isNaN(req.query.p) ? req.query.p : 1;
    const offset = resultsPerPage * (page - 1);
    const sql = `SELECT * FROM movies LIMIT ${resultsPerPage} OFFSET ${offset}`;

    let movies = [];

    await new Promise((resolve, reject) => {
        db.each(sql, async (err, row) => {
            const movie = new Movie(row.id, row.title, row.genre, row.year, row.poster_url, row.trailer_url, row.description);
            movies.push(movie);
        }, (err, num) => {
            if (err) reject(err);
            else resolve(num);
        });
    });

    res.json(movies);
});
movieRoutes.get('/:id', async (req, res) => {
    const movieId = req.params.id;
    const sql = `SELECT * FROM movies WHERE id = ?`;

    let movie;

    await new Promise((resolve, reject) => {
        db.get(sql, [movieId], (err, row) => {
            if (err) {
                reject(err);
            } else {
                if (row) {
                    movie = new Movie(row.id, row.title, row.genre, row.year, row.poster_url, row.trailer_url, row.description);
                }
                resolve();
            }
        });
    });

    if (movie) {
        res.json(movie);
    } else {
        res.status(404).json({ message: 'Movie not found' });
    }
});

module.exports = movieRoutes;