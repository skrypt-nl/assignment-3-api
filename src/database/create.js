// This file is responsible for creating the database structure

const db = require('./database')
const fs = require('fs');

const createDatabase = async () => {
  // Retrieve table names
  const tableNames = await new Promise((resolve, reject) => {
    db.all("SELECT name FROM sqlite_master WHERE type='table'", (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows.map(row => row.name));
      }
    });
  });

  // Drop tables
  const dropTables = tableNames.map(tableName => `DROP TABLE IF EXISTS ${tableName};`).join('\n');
  db.exec(dropTables, (err) => {
    if (err) {
      console.error('Error dropping tables:', err.message);
    }
  });

  // Enable foreign keys
  db.exec('PRAGMA foreign_keys = ON;', (err) => {
    if (err) {
      console.error('Error enabling foreign keys:', err.message);
    }
  });

  // Create tables
  const createTables = fs.readFileSync('./src/database/schema.sql', 'utf-8');

  db.exec(createTables, (err) => {
    if (err) {
      console.error('Error creating tables:', err.message);
    } else {
      console.log('Tables created successfully.');
    }
  });
};

module.exports = {
  createDatabase,
};
