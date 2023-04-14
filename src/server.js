// File responsible for configuring and starting the server

const express = require('express');
const router = require('./routes');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const cookieParser = require("cookie-parser");
const morgan = require('morgan');
const SQLiteStore = require('connect-sqlite3')(session);

const startServer = () => {
    const app = express();
    const port = 8042 //init session cookie;

    app.use(session({
        store: new SQLiteStore({
            db: 'sessions.sqlite3',
        }),
        name: 'webtech-movies',
        secret: 'eee669c7-2c81-4dc4-ab3f-9172c38447e2',
        resave: false,
        saveUninitialized: false,
        cookie: { 
          secure: false,
          maxAge: 60 * 60 * 24 * 365 // 1 min
        },
        genid: (req) => {
            return uuidv4();
        }
    }))

    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.json());

    app.use(morgan('combined'));
    
    app.use('/', router);
    app.use(express.static('./www', {extensions: ['html']}));

    app.use(cookieParser());

    app.listen(port);
}

module.exports = {
    startServer
};
