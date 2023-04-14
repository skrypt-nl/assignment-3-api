// This file serves as the default database connector

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database(process.env.DATABASE_NAME || 'db.sqlite3', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the database.');
});

module.exports = db