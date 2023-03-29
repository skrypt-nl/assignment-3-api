// Class for creating a movie object
class Movie {
    constructor(title, genre, year, poster, trailer, plot) {
        this.title = title;
        this.genre = genre;
        this.year = year;
        this.poster = poster;
        this.trailer = trailer;
        this.plot = plot;

        // Properties that can be added later
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

    // Returns only the first name of an Artist
    firstName() {
        return this.name.split(' ')[0];
    }
}

// The class Director inherits from the Artist class
class Director extends Artist {
    constructor(name, yearOfBirth) {
        super(name, yearOfBirth);
        this.movies = [];

        // Add a movie to the director's array of movies
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

// Define function with parameter 'title'
const displayMovieTitle = (title) => {

    // Select all elements with class '.movie-meta__title'
    const titleElements = document.querySelectorAll('.movie-meta__title');

    // Loop through each element in 'titleElements', so all elements with class '.movie-meta__title'
    for (const titleElement of titleElements) {

        // Set the text content of the found elements to the 'title' parameter
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

    // Define the text to display on the linkElement
    const text = "Watch trailer";

    for (const linkElement of linkElements) {
        // Set the href attribute to the provided URL
        linkElement.href = url;
        // Set the target attribute to '_blank' to open the URL in a new tab
        linkElement.target = '_blank';
        // Set the text content of the linkElement to the const text defined on line 115
        linkElement.textContent = text;

        // Create an image element for the arrow icon
        const arrowNode = document.createElement('img');
        // Set the source attribute of the arrow image element
        arrowNode.src = './assets/icons/arrow-right.svg';
        // Add the class 'movie__trailer-arrow' to the image element
        arrowNode.classList.add('movie__trailer-arrow');
        // Set the alt attribute of the arrow image to the const text defined on line 115 
        arrowNode.alt = text;

        // Append the arrow image element to the link element as a child
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
    // Loop through all actors in the 'actors' array
    actors.forEach((actor) => {
        // Create div that contains the actor's information
        const actorDiv = document.createElement('div');
        // Add the classes 'artist' and 'artist--actor' to the div
        actorDiv.classList.add('artist', 'artist--actor');

        // Create img element 
        const img = document.createElement('img');
        // Add class 'artist__img' to img element
        img.classList.add('artist__img');
        // Get the source of the image
        img.src = actor.photo;
        // Append img element to actorDiv as a child element
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

        // Create tooltip for actors that can be seen when hovering over their name/image
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
        /* 
        Check if writer of the movie has written any books:
        1) if they have, the tooltop heading will be 'Books written by by ${writer.firstname()}'
        2) if they have not, the tooltip heading will be '${writer.firstname()} hasn't written any books'
        */
        if (writer.books.length > 0) tooltipLabelHeading.classList.add('artist-tooltip__label');
        tooltipLabelHeading.textContent = writer.books.length > 0 ? `Books written by ${writer.firstName()}` : `${writer.firstName()} hasn't written any books`;
        tooltipDiv.appendChild(tooltipLabelHeading);

        const tooltipList = document.createElement('ul');
        tooltipList.classList.add('artist-tooltip__list');
        tooltipDiv.appendChild(tooltipList);

        // Create a list of books that the writer of the movie has written
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

// Displays movie actors by adding them to the specified elements in the HTML DOM
const displayMovieActors = (actors) => {
    document.querySelectorAll('.artists-group--actors').forEach((groupElement) => {
        groupElement.querySelectorAll('.artists-group__label').forEach((labelElement) => {
            labelElement.textContent = 'Actors';
        });

        // Loop through all elements with the class '.artists-group__list' and add the actors to each of them
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

// Call all the display and set functions within one function
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

// Create director, movies, writers and actors by defining their parameters
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
        1976, ["Memento Mori (2001)", "Short story basis for Memento (2000)"]
    )

    const christopherWriter = new Writer(
        'Christopher Nolan',
        1970
    )

    const mcconaugheyActor = new Actor(
        'Matthew McConaughey',
        1969,
        './assets/img/cooper.jpeg'
    )

    const foyActor = new Actor(
        'Mackenzie Foy',
        2000,
        './assets/img/murph.webp'
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

var navLi = document.querySelector(".accessibility__elem")
var navLi1 = document.querySelector(".accessibility__edit")

// Create menu with html 'select' element
function menuElem() {
    var selectElem = document.createElement("Select");
    selectElem.setAttribute("id", "MySelect");
    navLi.appendChild(selectElem);

    // Define elements of the document that can be changed
    var options = ["Select Element", "body", "header", "footer", "aside", "article", "section"];

    // Create dropdown list that contains all the options
    for (var i = 0; i < options.length; i++) {
        var optionElem = document.createElement("option");
        optionElem.setAttribute("value", options[i]);
        var optionText = document.createTextNode(options[i]);
        optionElem.appendChild(optionText);
        document.getElementById("MySelect").appendChild(optionElem);
    }
}

function menuEdit() {
    var selectElem2 = document.createElement("Select");
    selectElem2.setAttribute("id", "MySelect2");
    navLi1.appendChild(selectElem2);

    // Define styles to which the elements of the document can be changed
    globalThis.options2 = ["Select Adjustment", "Fontsize Small", "Fontsize Large", "Text-Color Black", "Text-Color White"];

    for (var i = 0; i < options2.length; i++) {
        var optionElem2 = document.createElement("option");
        optionElem2.setAttribute("value2", options2[i]);
        var optionText2 = document.createTextNode(options2[i]);
        optionElem2.appendChild(optionText2);
        document.getElementById("MySelect2").appendChild(optionElem2);
    }
}

// Add functionality to the change of style of the elements of the documents
function changeListenerElem() {
    var value = this.value;
    if (value == "Select Element") {
        window.alert("Please select an element")
    } else {
        globalThis.valueElem = value;
    }
}

function setTextColor(element, r, g, b) {
    element.style.setProperty('--text-color-r', r);
    element.style.setProperty('--text-color-g', g);
    element.style.setProperty('--text-color-b', b);

    element.style.setProperty('--text-color', 'rgb(var(--text-color-r), var(--text-color-g), var(--text-color-b))');
    element.style.color = "var(--text-color)";
}

function setTextSize(element, size) {
    element.style.setProperty('--text-size', size);
    element.style.fontSize = "var(--text-size)";
}

function executeEdit() {
    var value = this.value;
    if (value == "Select Adjustment") {
        // Alert user that they have not selected any adjustment
        window.alert("Please make a selection")
    } else if (value == options2[1]) {
        document.querySelectorAll(valueElem).forEach(element => {
            // Make text really small
            setTextSize(element, '0.75rem');
        });
    } else if (value == options2[2]) {
        document.querySelectorAll(valueElem).forEach(element => {
            // Make text really large
            setTextSize(element, '1.5rem');
        });
    } else if (value == options2[3]) {
        document.querySelectorAll(valueElem).forEach(element => {
            // Set text color to black
            setTextColor(element, 0, 0, 0);
        });
    } else if (value == options2[4]) {
        document.querySelectorAll(valueElem).forEach(element => {
            // Set text color to white
            setTextColor(element, 255, 255, 255);
        });
    }
}

menuElem();
menuEdit();

document.getElementById("MySelect").onchange = changeListenerElem;
document.getElementById("MySelect2").onchange = executeEdit;