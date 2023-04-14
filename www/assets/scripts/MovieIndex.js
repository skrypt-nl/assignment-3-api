// Fetch all movies from the API and create elements to show the poster, title and some metadata for each movie that is available

const urlParams = new URLSearchParams(window.location.search);
const p = urlParams.get('p');
const currentPage = (p && !isNaN(p)) ? parseInt(p) : 1;

async function getMovies() {
    const url = `http://localhost:8042/api/movies?p=${currentPage}`

    const response = await fetch(url);
    const movies = await response.json();
    
    movies.forEach(function (movie) {

        const displayMovies = (movies) => {
            document.querySelectorAll('.movies-group--movie').forEach((groupElement) => {
                groupElement.querySelectorAll('.movies-group__label').forEach((labelElement) => {
                    labelElement.textContent = 'Movies';
                });
        
            groupElement.querySelectorAll('.movies-group__list').forEach((listElement) => {
                addMoviesToElement(movies, listElement);
            });
            });
        }

        const addMoviesToElement = (movie, parentElement) => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('mov', 'mov--movie');
        
            const metaDiv = document.createElement('div');
            metaDiv.classList.add('mov-meta');
            movieDiv.appendChild(metaDiv);

            const posterImage = document.createElement('img');
            posterImage.classList.add('mov-meta__poster');
            posterImage.src = movie.poster;
            metaDiv.appendChild(posterImage);
        
            const titleHeading = document.createElement('a');
            titleHeading.classList.add('mov-meta__title');
            titleHeading.textContent = movie.title;
            titleHeading.href = "/movie/"+movie.id+"";
            metaDiv.appendChild(titleHeading);
        
            const yearHeading = document.createElement('h5');
            yearHeading.classList.add('mov-meta__year');
            yearHeading.textContent = movie.year;
            metaDiv.appendChild(yearHeading);

            const genreHeading = document.createElement('h5');
            genreHeading.classList.add('mov-meta__year');
            genreHeading.textContent = movie.genre;
            metaDiv.appendChild(genreHeading);
             
            parentElement.appendChild(metaDiv);
        }

        displayMovies(movie);
    });

}

getMovies();

function createButtons() {
    const paginationWrapper = document.getElementById('pagination');

    // Allow navigation to page 1 if the user is on page 2
    if (currentPage === 2) {
        const prevLink = document.createElement("a");
        prevLink.textContent = "< Previous page";
        prevLink.href = `/?p=${currentPage - 1}`;

        paginationWrapper.appendChild(prevLink);
    }

    // Allow navigation to page 2 if the user is on page 1
    if (currentPage === 1) {
        const nextLink = document.createElement("a");
        nextLink.textContent = "Next page >";
        nextLink.href = `/?p=${currentPage + 1}`
    
        paginationWrapper.appendChild(nextLink);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    createButtons();
})
