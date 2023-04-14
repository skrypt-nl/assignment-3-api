// Script for 'npm run dev'

const { startServer } = require('./src/server.js')

const run = async () => {
    startServer();
}

run();