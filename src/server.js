const express = require('express');
const router = require('./routes');

const startServer = () => {
    const app = express();
    const port = 8042;
    
    app.use('/', router);

    app.listen(port);
}

module.exports = {
    startServer
};
