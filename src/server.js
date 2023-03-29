const express = require('express');
const router = require('./routes');

const startServer = () => {
    const app = express();
    const port = 3000;
    
    app.use('/', router);

    app.listen(port);
}

module.exports = {
    startServer
};
