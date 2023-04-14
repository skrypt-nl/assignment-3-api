// This file seeds the database with the contents of seeder.sql, and the provided users

const hash = require('../utils/hash');
const db = require('./database');
const fs = require('fs');

const createUsers = async () => { //create 5 users
  const users = [
    {
      name: 'Superman',
      login: 'superman',
      email: 'superman@gmail.com',
      password: await hash('secret'),
      address: 'Super street 2',
      credit_card: '1234123412341234'
    },
    {
      name: 'Luke',
      login: 'luke',
      email: 'luke@gmail.com',
      password: await hash('secret'),
      address: 'Nieuweweg 45',
      credit_card: '1234123412341234'
    },
    {
      name: 'Karen',
      login: 'karen',
      email: 'karen19@gmail.com',
      password: await hash('secret'),
      address: 'Kerkstraat 1',
      credit_card: '1234123412341234'
    },
    {
      name: 'Rick',
      login: 'rick',
      email: 'rick@gmail.com',
      password: await hash('secret'),
      address: 'Padualaan 12',
      credit_card: '1234123412341234'
    },
    {
      name: 'Tomas',
      login: 'tomas',
      email: 'tomas@gmail.com',
      password: await hash('secret'),
      address: 'Bolognalaan 123',
      credit_card: '1234123412341234'
    }
    
  ];

  users.forEach((user) => {
    db.run(
        'INSERT INTO users (name, email, login, password, address, credit_card) VALUES (?, ?, ?, ?, ?, ?)',
        [user.name, user.email, user.login, user.password, user.address, user.credit_card]
    );
  });
}

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

    await createUsers();
};

module.exports = {
  seedDatabase,
};
