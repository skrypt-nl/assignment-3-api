async function getMovies() {
    const response = await fetch('http://localhost:8042/api/movies');
    const movies = await response.json();
    console.log(movies);
}

getMovies();

