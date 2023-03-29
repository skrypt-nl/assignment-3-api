const db = require("../../database/database");
const movier = require('movier');
const Movie = require('./movie')

exports.get = async (req, res) => {
    const resultsPerPage = 10;
    console.log(req.query.p);
    const page = req.query.p ?? 1;
    const offset = resultsPerPage * (page - 1);
    const sql = `SELECT * FROM movies LIMIT ${resultsPerPage} OFFSET ${offset}`;

    let movies = [];
    
    await new Promise((resolve, reject) => {
        db.each(sql, async (err, row) => {
            const movie = new Movie(row.id, row.title, row.genre, row.year, row.poster_url, row.trailer_url, row.description);
            await movies.push(movie);
        }, (err, num) => {
            if (err) reject(err);
            else resolve(num);
        });
    });

    res.json(movies);
}