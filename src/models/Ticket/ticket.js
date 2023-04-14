// Ticket Class

const db = require("../../database/database");
const MoviePlay = require("../MoviePlay/moviePlay");

class Ticket {
    constructor(userId, movieId, movieDate, movieTime, amount, purchasedOn = null) {
        this.userId = userId;
        this.movieId = movieId;
        this.movieDate = movieDate;
        this.movieTime = movieTime;
        this.amount = amount;

        this.purchasedOn = purchasedOn ?? new Date().toISOString().slice(0, 19).replace('T', ' ').toString();
    }

    async getMoviePlay() {
        const sql = `SELECT * FROM movie_plays WHERE movie_id = ? AND movie_date LIKE ? LIMIT 1`;
        const args = [this.movieId, `${this.movieDate} ${this.movieTime}`];

        const moviePlay = await new Promise((resolve, reject) => {
            db.get(sql, args, async (err, row) => {
                const play = new MoviePlay(row.id, this, row.movie_date, row.ticket_price);
                resolve(play);
            });
        });

        return moviePlay;
    }

    async save() {
        const moviePlay = await this.getMoviePlay();

        if (!moviePlay) {
            throw new Error('Invalid time or date');
        }

        db.run(
            'INSERT INTO tickets (user_id, movie_play_id, amount, purchased_on) VALUES (?, ?, ?, ?)',
            [this.userId, moviePlay.id, this.amount, this.purchasedOn]
        );
    }
}

module.exports = Ticket;