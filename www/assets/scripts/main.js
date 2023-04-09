class Movie {
    constructor(title, genre, year, poster, trailer, plot) {
        this.title = title;
        this.genre = genre;
        this.year = year;
        this.poster = poster;
        this.trailer = trailer;
        this.plot = plot;

        this.director = null;
        this.setDirector = (director) => {
            this.director = director;
        }

        this.writers = [];
        this.addWriter = (writer) => {
            this.writers.push(writer);
        }

        this.actors = [];
        this.addActor = (actor) => {
            this.actors.push(actor);
        }
    }
}

class Artist {
    constructor(name, yearOfBirth) {
        this.name = name;
        this.yearOfBirth = yearOfBirth;
    }

    firstName() {
        return this.name.split(' ')[0];
    }
}

class Director extends Artist {
    constructor(name, yearOfBirth) {
        super(name, yearOfBirth);
        this.movies = [];

        this.addMovie = (movie) => {
            this.movies.push(movie);
        }
    }
}

class Writer extends Artist {
    constructor(name, yearOfBirth, books = []) {
        super(name, yearOfBirth);
        this.books = books;
    }
}

class Actor extends Artist {
    constructor(name, yearOfBirth, photo) {
        super(name, yearOfBirth);
        this.photo = photo;

        this.movies = []
        this.addMovie = (movie) => {
            this.movies.push(movie);
        }
    }
}

const displayMovieTitle = (title) => {
    const titleElements = document.querySelectorAll('.movie-meta__title');

    for (const titleElement of titleElements) {
        titleElement.textContent = title;
    }
}

const displayMovieGenre = (genre) => {
    const genreElements = document.querySelectorAll('.movie-meta__genre');

    for (const genreElement of genreElements) {
        genreElement.textContent = genre;
    }
}

const displayMovieYear = (year) => {
    const yearElements = document.querySelectorAll('.movie-meta__year');

    for (const yearElement of yearElements) {
        yearElement.textContent = year;
    }
}

const setMoviePlot = (plot) => {
    const plotElements = document.querySelectorAll('.movie-meta__plot');

    for (const plotElement of plotElements) {
        plotElement.textContent = plot;
    }
}

const setMovieTrailerURL = (url) => {
    const linkElements = document.querySelectorAll('a.movie-meta__trailer');

    const text = "Watch trailer";

    for (const linkElement of linkElements) {
        linkElement.href = url;
        linkElement.target = '_blank';
        linkElement.textContent = text;

        const arrowNode = document.createElement('img');
        arrowNode.src = '../../assets/icons/arrow-right.svg';
        arrowNode.classList.add('movie__trailer-arrow');
        arrowNode.alt = text;

        linkElement.appendChild(arrowNode);
    }
}

const setMoviePosterSrc = (src, alt) => {
    const posterElements = document.querySelectorAll('img.movie__poster-img');

    for (const posterElement of posterElements) {
        posterElement.src = src;
        posterElement.alt = alt;
    }
}

const addActorsToElement = (actors, parentElement) => {
    actors.forEach((actor) => {
        const actorDiv = document.createElement('div');
        actorDiv.classList.add('artist', 'artist--actor');
        
        const img = document.createElement('img');
        img.classList.add('artist__img');
        img.src = actor.photo;
        actorDiv.appendChild(img);

        const metaDiv = document.createElement('div');
        metaDiv.classList.add('artist-meta');
        actorDiv.appendChild(metaDiv);

        const nameHeading = document.createElement('h4');
        nameHeading.classList.add('artist-meta__name');
        nameHeading.textContent = actor.name;
        metaDiv.appendChild(nameHeading);

        const birthyearHeading = document.createElement('h5');
        birthyearHeading.classList.add('artist-meta__birthyear');
        birthyearHeading.textContent = `Born in ${actor.yearOfBirth}`;
        metaDiv.appendChild(birthyearHeading);

        const tooltipDiv = document.createElement('div');
        tooltipDiv.classList.add('artist-tooltip');
        actorDiv.appendChild(tooltipDiv);

        const tooltipLabelHeading = document.createElement('h5');
        tooltipLabelHeading.classList.add('artist-tooltip__label');
        tooltipLabelHeading.textContent = 'Previous movies';
        tooltipDiv.appendChild(tooltipLabelHeading);

        const tooltipList = document.createElement('ul');
        tooltipList.classList.add('artist-tooltip__list');
        tooltipDiv.appendChild(tooltipList);

        actor.movies.forEach((movie) => {
            const tooltipItem = document.createElement('li');
            tooltipItem.classList.add('artist-tooltip__item');
            tooltipItem.textContent = movie.title;
            tooltipList.appendChild(tooltipItem);
        });

        parentElement.appendChild(actorDiv);
    });
}

const addWritersToElement = (writers, parentElement) => {
    writers.forEach((writer) => {
        const writerDiv = document.createElement('div');
        writerDiv.classList.add('artist', 'artist--writer');

        const metaDiv = document.createElement('div');
        metaDiv.classList.add('artist-meta');
        writerDiv.appendChild(metaDiv);

        const nameHeading = document.createElement('h4');
        nameHeading.classList.add('artist-meta__name');
        nameHeading.textContent = writer.name;
        metaDiv.appendChild(nameHeading);

        const birthyearHeading = document.createElement('h5');
        birthyearHeading.classList.add('artist-meta__birthyear');
        birthyearHeading.textContent = `Born in ${writer.yearOfBirth}`;
        metaDiv.appendChild(birthyearHeading);

        const tooltipDiv = document.createElement('div');
        tooltipDiv.classList.add('artist-tooltip');
        writerDiv.appendChild(tooltipDiv);

        const tooltipLabelHeading = document.createElement('h5');
        if (writer.books.length > 0) tooltipLabelHeading.classList.add('artist-tooltip__label');
        tooltipLabelHeading.textContent = writer.books.length > 0 ? `Books written by ${writer.firstName()}` : `${writer.firstName()} hasn't written any books`;
        tooltipDiv.appendChild(tooltipLabelHeading);

        const tooltipList = document.createElement('ul');
        tooltipList.classList.add('artist-tooltip__list');
        tooltipDiv.appendChild(tooltipList);

        writer.books.forEach((book) => {
            const tooltipItem = document.createElement('li');
            tooltipItem.classList.add('artist-tooltip__item');
            tooltipItem.textContent = book;
            tooltipList.appendChild(tooltipItem);
        });

        parentElement.appendChild(writerDiv);
    });
}

const addDirectorToElement = (director, parentElement) => {
    const directorDiv = document.createElement('div');
    directorDiv.classList.add('artist', 'artist--director');

    const metaDiv = document.createElement('div');
    metaDiv.classList.add('artist-meta');
    directorDiv.appendChild(metaDiv);

    const nameHeading = document.createElement('h4');
    nameHeading.classList.add('artist-meta__name');
    nameHeading.textContent = director.name;
    metaDiv.appendChild(nameHeading);

    const birthyearHeading = document.createElement('h5');
    birthyearHeading.classList.add('artist-meta__birthyear');
    birthyearHeading.textContent = `Born in ${director.yearOfBirth}`;
    metaDiv.appendChild(birthyearHeading);

    const tooltipDiv = document.createElement('div');
    tooltipDiv.classList.add('artist-tooltip');
    directorDiv.appendChild(tooltipDiv);

    const tooltipLabelHeading = document.createElement('h5');
    if (director.movies.length > 0) tooltipLabelHeading.classList.add('artist-tooltip__label');
    tooltipLabelHeading.textContent = director.movies.length > 0 ? `Movies directed by ${director.firstName()}` : `${director.firstName()} hasn't directed any movies yet`;
    tooltipDiv.appendChild(tooltipLabelHeading);

    const tooltipList = document.createElement('ul');
    tooltipList.classList.add('artist-tooltip__list');
    tooltipDiv.appendChild(tooltipList);

    director.movies.forEach((movie) => {
        const tooltipItem = document.createElement('li');
        tooltipItem.classList.add('artist-tooltip__item');
        tooltipItem.textContent = movie.title;
        tooltipList.appendChild(tooltipItem);
    });

    parentElement.appendChild(directorDiv);
}

const displayMovieActors = (actors) => {
    document.querySelectorAll('.artists-group--actors').forEach((groupElement) => {
        groupElement.querySelectorAll('.artists-group__label').forEach((labelElement) => {
            labelElement.textContent = 'Actors';
        });

        groupElement.querySelectorAll('.artists-group__list').forEach((listElement) => {
            addActorsToElement(actors, listElement);
        });
    });
}

const displayMovieWriters = (writers) => {
    document.querySelectorAll('.artists-group--writers').forEach((groupElement) => {
        groupElement.querySelectorAll('.artists-group__label').forEach((labelElement) => {
            labelElement.textContent = 'Writers';
        });

        groupElement.querySelectorAll('.artists-group__list').forEach((listElement) => {
            addWritersToElement(writers, listElement);
        });
    });
}

const displayMovieDirector = (director) => {
    document.querySelectorAll('.artists-group--director').forEach((groupElement) => {
        groupElement.querySelectorAll('.artists-group__label').forEach((labelElement) => {
            labelElement.textContent = 'Director';
        });

        groupElement.querySelectorAll('.artists-group__list').forEach((listElement) => {
            addDirectorToElement(director, listElement);
        });
    });
}

const displayMovie = (movie) => {
    displayMovieTitle(movie.title);
    displayMovieGenre(movie.genre);
    displayMovieYear(movie.year);
    setMoviePlot(movie.plot);
    setMovieTrailerURL(movie.trailer);
    setMoviePosterSrc(movie.poster, `${movie.title} poster`);

    displayMovieActors(movie.actors);
    displayMovieWriters(movie.writers);
    displayMovieDirector(movie.director);
}

document.addEventListener("DOMContentLoaded", () => {
    const nolanDirector = new Director(
        'Christopher Nolan',
        1970
    );

    const interstellarMovie = new Movie(
        'Interstellar',
        'Adventure, Sci-fi',
        '2014', 
        "./assets/img/poster.webp",
        "https://youtu.be/zSWdZVtXT7E",
        "While the Earth is no longer able to provide humanity with the necessities of life, a group of explorers are looking for a future for humanity beyond the stars, far beyond the Milky Way."
    );

    const tenetMovie = new Movie(
        'Tenet',
        'Thriller, Sci-fi',
        2020
    );

    const jonathanWriter = new Writer(
        'Jonathan Nolan',
        1976,
        [ "Memento Mori (2001)",  "Short story basis for Memento (2000)" ]
    )

    const christopherWriter = new Writer(
        'Christopher Nolan',
        1970
    )

    const mcconaugheyActor = new Actor(
        'Matthew McConaughey',
        1969,
        '../../assets/img/cooper.jpeg'
    )

    const foyActor = new Actor(
        'Mackenzie Foy',
        2000,
        '../../assets/img/murph.webp'
    )

    interstellarMovie.setDirector(nolanDirector);
    tenetMovie.setDirector(nolanDirector);

    nolanDirector.addMovie(interstellarMovie);
    nolanDirector.addMovie(tenetMovie);

    interstellarMovie.addWriter(jonathanWriter);
    interstellarMovie.addWriter(christopherWriter);

    interstellarMovie.addActor(mcconaugheyActor);
    interstellarMovie.addActor(foyActor);

    foyActor.addMovie(interstellarMovie);
    foyActor.addMovie(tenetMovie);

    mcconaugheyActor.addMovie(interstellarMovie);

    displayMovie(interstellarMovie);
});
