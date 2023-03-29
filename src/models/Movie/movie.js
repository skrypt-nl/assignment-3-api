class Movie {
    constructor(id, title, genre, year, poster, trailer, plot) {
        this.id = id;
        this.title = title;
        this.genre = genre;
        this.year = year;
        this.poster = poster;
        this.trailer = trailer;
        this.plot = plot;
    }
}

module.exports = Movie;