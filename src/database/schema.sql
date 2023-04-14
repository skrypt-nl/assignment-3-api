CREATE TABLE movies (
    id INTEGER,
    title TEXT,
    description TEXT,
    genre TEXT,
    year INTEGER,
    trailer_url TEXT,
    poster_url TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE users (
    id INTEGER,
    name TEXT,
    email TEXT,
    login TEXT,
    password TEXT,
    address TEXT,
    credit_card TEXT,
    PRIMARY KEY (id)
);

CREATE TABLE tickets (
    id INTEGER,
    user_id TEXT,
    movie_play_id INTEGER,
    amount INTEGER,
    purchased_on TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (movie_play_id) REFERENCES movie_plays(id)
);

CREATE TABLE movie_plays (
    id INTEGER,
    movie_id TEXT,
    movie_date TEXT,
    PRIMARY KEY (id),
    FOREIGN KEY (movie_id) REFERENCES movies(id)
);
