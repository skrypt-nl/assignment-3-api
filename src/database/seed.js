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

const createTickets = async () => {
  const tickets = [
    {
      userId: 1,
      moviePlayId: 2,
      amount: 4
    },
    {
      userId: 2,
      moviePlayId: 44,
      amount: 2
    },
    {
      userId: 3,
      moviePlayId: 63,
      amount: 2
    },
    {
      userId: 4,
      moviePlayId: 111,
      amount: 6
    },
    {
      userId: 5,
      moviePlayId: 86,
      amount: 3
    },
    {
      userId: 1, 
      moviePlayId: 97,
      amount: 8
    },
    {
      userId: 2, 
      moviePlayId: 133, 
      amount: 1
    },
    {
      userId: 3,
      moviePlayId: 56, 
      amount: 7
    },
    {
      userId: 4, 
      moviePlayId: 78,
      amount: 3
    },
    {
      userId: 5, 
      moviePlayId: 6,
      amount: 5
    },
  ];

  const purchaseDate = new Date().toISOString().slice(0, 19).replace('T', ' ').toString();

  tickets.forEach((ticket) => {
    db.run(
        'INSERT INTO tickets (user_id, movie_play_id, amount, purchased_on) VALUES (?, ?, ?, ?)',
        [ticket.userId, ticket.moviePlayId, ticket.amount, purchaseDate]
    );
  });
}

const seedDatabase = async () => {
    const seedSql = fs.readFileSync('./src/database/seeder.sql', 'utf-8');

    await db.exec(seedSql, (err) => {
        if (err) {
            console.error('Error seeding tables:', err.message);
        } else {
          console.log('Tables seeded successfully.');
        }
    });

    await createUsers();
    await createTickets();
};

module.exports = {
  seedDatabase,
};
