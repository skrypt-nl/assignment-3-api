const express = require('express');
const router = require('./routes');

const startServer = () => {
    const app = express();
    const port = 8042;

    app.use(express.json());
    
    app.use('/api/', router);
    app.use(express.static('./www', {extensions: ['html']}));

    app.listen(port);
}

module.exports = {
    startServer
};
