// Fetch the movie that the user has selected from index.html and add all of the movie's metadata to movie.html

async function getMovies() {
    const movieId = window.location.pathname.split('movie/')[1]; // Split path to get id
    
    const response = await fetch(`/group42/api/movies/${movieId}`); // Fetch selected movie
    const movie = await response.json();

    const addMoviesToElement = (movie) => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('mov', 'mov--movie');
    
        const metaDiv = document.createElement('div');
        metaDiv.classList.add('mov-meta');
        movieDiv.appendChild(metaDiv);            

        const posterElements = document.querySelectorAll('.mov-meta__poster');
        for (const posterElement of posterElements) {
            posterElement.src = movie.poster;
            posterElement.alt = "Poster";
        }

        const titleElements = document.querySelectorAll('.movie-meta__title');
        for (const titleElement of titleElements) {
            titleElement.textContent = movie.title;
        }

        const genreElements = document.querySelectorAll('.movie-meta__genre');
        for (const genreElement of genreElements) {
            genreElement.textContent = movie.genre;
        }

        const yearElements = document.querySelectorAll('.movie-meta__year');
        for (const yearElement of yearElements) {
            yearElement.textContent = movie.year;
        }
        
        const plotElements = document.querySelectorAll('.movie-meta__plot');
        for (const plotElement of plotElements) {
            plotElement.textContent = movie.plot;
        }
    
        const linkElements = document.querySelectorAll('a.movie-meta__trailer');
        const text = "Watch trailer\n";
        for (const linkElement of linkElements) {
            linkElement.href = movie.trailer;
            linkElement.target = '_blank';
            linkElement.textContent = text;

            const arrowNode = document.createElement('img');
            arrowNode.src = '/group42/assets/icons/arrow-right.svg';
            arrowNode.classList.add('movie__trailer-arrow');
            arrowNode.alt = text;

            linkElement.appendChild(arrowNode);
        }
        
        // Create button that lets a user proceed to the order page for the selected movie
        const buttonPlace = document.querySelector('a.nav-button');
        const button = document.createElement("button");
        const link = document.createElement("a");
        buttonPlace.href = "/group42/order/"+movie.id+"";
        button.textContent = "Buy Tickets";
        buttonPlace.appendChild(link);
        link.appendChild(button);
    }

    addMoviesToElement(movie);
 
}

getMovies();
