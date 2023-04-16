// Retrieve the times and dates for the movie that was chosen on movie.html and show these options to the user on the order.html page

const movieId = window.location.pathname.split('order/')[1];

// Factory function to get all moviePlays or the moviePlays on a specific date
async function getPlays(date = null) {
    let url = `/group42/api/movies/${movieId}/plays/`;
    if (date) url += `?date=${date}`;

    const response = await fetch(url);
    const plays = await response.json();

    return plays;
}

// Get all dates when a movie plays
async function getDates() {    
    const plays = await getPlays();

    const dates = [];

    plays.forEach((play) => {
        const date = play.date.slice(0, 10);
        if (!dates.includes(date)) dates.push(date);
    });
    
    return dates;
}

// Get all times when a movie plays on a given date
async function getTimes(date) {
    const plays = await getPlays(date);
    
    return plays.map((play) => play.date.slice(11));
}

// Get all movie details
async function getMovieDetails() {
    const response = await fetch(`/group42/api/movies/${movieId}`);
    const movie = await response.json();

    const addOrderElements = (movie) => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('ord', 'ord--order');
    
        const metaDiv = document.createElement('div');
        metaDiv.classList.add('ord-meta');
        movieDiv.appendChild(metaDiv);            

        const posterElements = document.querySelectorAll('.ord-meta__poster');
        for (const posterElement of posterElements) {
            posterElement.src = movie.poster;
            posterElement.alt = "Poster";
        }

        const titleElements = document.querySelectorAll('.order-meta__title');
        for (const titleElement of titleElements) {
            titleElement.textContent = movie.title;
        }

        const genreElements = document.querySelectorAll('.order-meta__genre');
        for (const genreElement of genreElements) {
            genreElement.textContent = movie.genre;
        }

        const yearElements = document.querySelectorAll('.order-meta__year');
        for (const yearElement of yearElements) {
            yearElement.textContent = movie.year;
        }

        const plotElements = document.querySelectorAll('.order-meta__plot');
        for (const plotElement of plotElements) {
            plotElement.textContent = movie.plot;
        }
    }

    addOrderElements(movie);
}

// Get all dates and add them to the dates dropdown
async function loadDates(state = null) {
    const dateField = document.getElementById('date');
    const dates = await getDates();

    dates.forEach((date) => {
        const dateOption = document.createElement('option');
        dateOption.value = date;
        dateOption.textContent = date;
        dateOption.selected = state ? state.movieDate === date : false;

        dateOption.setAttribute("class", "select-selected");

        dateField.appendChild(dateOption);
    })

    // Load the times for either the date from the orderState, or the first date in the dates dropdown when no orderState exists
    await loadTimes(state ? state.movieDate : dates[0], state ? state.movieTime : null);
}

// Get all times and add them to the times dropdown
async function loadTimes(date = null, selectedTime = null) {
    if (!date) {
        const dateField = document.getElementById('date');
        date = dateField.options[dateField.selectedIndex].text;
    }

    const timeField = document.getElementById('time');
    while (timeField.firstChild) {
        timeField.removeChild(timeField.firstChild);
    }

    const times = await getTimes(date);

    times.forEach((time) => {
        const timeOption = document.createElement('option');
        timeOption.value = time;
        timeOption.textContent = time;
        timeOption.selected = time === selectedTime;

        timeField.appendChild(timeOption);
    })
}

// Retrieve the orderState for the current movie
async function retrieveState() {
    let url = `/group42/api/movies/${movieId}/orderState`;

    const response = await fetch(url);

    if (response.status === 200) {
        state = await response.json();

        document.getElementById('tickets').value = state.numberOfTickets;
        document.getElementById('date').value = state.movieDate;

        return state;
    }
}

async function updateState() {
    const numberOfTickets = document.getElementById('tickets');
    const date = document.getElementById('date');
    const time = document.getElementById('time');

    const data = {
        numberOfTickets: numberOfTickets.value,
        movieDate: date.value,
        movieTime: time.value
    };

    const url = `/group42/api/movies/${movieId}/orderState`;

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error updating order state:', error);
    }
}


document.addEventListener('DOMContentLoaded', async () => {
    await getMovieDetails();

    const state = await retrieveState();
    await loadDates(state);

    if (!state) {
        updateState();
    }

    const formElements = [
        document.getElementById('tickets'),
        document.getElementById('date'),
        document.getElementById('time')
    ]

    formElements.forEach((formElement) => {
        formElement.addEventListener('change', updateState);
    })

    document.getElementById('date').addEventListener('change', () => {
        loadTimes()
    });
})