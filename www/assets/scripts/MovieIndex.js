async function getMovies() {
    const response = await fetch('http://localhost:8042/api/movies');
    const movies = await response.json();
    //console.log(movies[0]);
    
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
            console.log(movie);
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('mov', 'mov--movie');
        
            const metaDiv = document.createElement('div');
            metaDiv.classList.add('mov-meta');
            movieDiv.appendChild(metaDiv);
        
            const titleHeading = document.createElement('h4');
            titleHeading.classList.add('mov-meta__title');
            titleHeading.textContent = movie.title;
            metaDiv.appendChild(titleHeading);
        
            const yearHeading = document.createElement('h5');
            yearHeading.classList.add('mov-meta__year');
            yearHeading.textContent = movie.year;
            metaDiv.appendChild(yearHeading);

            const genreHeading = document.createElement('h5');
            genreHeading.classList.add('mov-meta__year');
            genreHeading.textContent = movie.genre;
            metaDiv.appendChild(genreHeading);

            const plot = document.createElement('h5');
            plot.classList.add('mov-meta__plot');
            plot.textContent = movie.plot;
            metaDiv.appendChild(plot);
            
            
        
            parentElement.appendChild(metaDiv);
        }

        displayMovies(movie);

            
    });

}

getMovies();

