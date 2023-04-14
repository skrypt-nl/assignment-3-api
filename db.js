const { createDatabase } = require('./src/database/create.js');
const { seedDatabase } = require('./src/database/seed.js');

const run = async () => {
    await createDatabase();
    await seedDatabase();
}

run();
