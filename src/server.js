const express = require('express');
const router = require('./routes');
const session = require('express-session');
const { v4: uuidv4 } = require('uuid');
const bodyParser = require('body-parser');

const startServer = () => {
    const app = express();
    const port = 8042;

    app.use(session({
        name: 'webtech-movies',
        secret: 'eee669c7-2c81-4dc4-ab3f-9172c38447e2',
        resave: false,
        saveUninitialized: false,
        cookie: { 
          secure: false, // This will only work if you have https enabled!
          maxAge: 60 * 60 * 24 * 365 // 1 min
        },
        genid: (req) => {
            return uuidv4();
        }
    }))

    // configure the app to use bodyParser()
    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());
    
    app.use('/', router);
    app.use(express.static('./www', {extensions: ['html']}));

    app.listen(port);
}

module.exports = {
    startServer
};
