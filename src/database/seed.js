const db = require('./database');
const fs = require('fs');

const seedDatabase = async () => {
    // Seed tables
    const seedSql = fs.readFileSync('./src/database/seeder.sql', 'utf-8');

    await db.exec(seedSql, (err) => {
        if (err) {
            console.error('Error seeding tables:', err.message);
        } else {
          console.log('Tables seeded successfully.');
        }
    });
};

module.exports = {
  seedDatabase,
};
