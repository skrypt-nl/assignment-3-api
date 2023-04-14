// Movie Class

const db = require("../../database/database");
const MoviePlay = require("../MoviePlay/moviePlay");

class Movie {
    constructor(id) {
        this.id = id;
    }

    async fetch() {
        const sql = `SELECT * FROM movies WHERE id = ?`;
    
        await new Promise((resolve, reject) => {
            db.get(sql, [this.id], (err, row) => {
                if (err) {
                    reject(err);
                } else {
                    if (row) {
                        this.title = row.title;
                        this.genre = row.genre;
                        this.year = row.year;
                        this.poster = row.poster_url;
                        this.trailer = row.trailer_url;
                        this.plot = row.description;
                    }
                    resolve();
                }
            });
        });

        return this;
    }

    async getMoviePlays(date = null) {
        let sql;
        let args;
        
        if (date) {
            sql = `SELECT * FROM movie_plays WHERE movie_id = ? AND movie_date LIKE ? ORDER BY movie_date ASC`;
            args = [this.id, `${date}%`];
        } else {
            sql = `SELECT * FROM movie_plays WHERE movie_id = ? ORDER BY movie_date ASC`;
            args = [this.id];
        }

        let plays = [];
    
        await new Promise((resolve, reject) => {
            db.each(sql, args, async (err, row) => {
                const play = new MoviePlay(row.id, this, row.movie_date, row.ticket_price);
                plays.push(play);
            }, (err, num) => {
                if (err) reject(err);
                else resolve(num);
            });
        });
    
        return plays;
    }
}

module.exports = Movie;