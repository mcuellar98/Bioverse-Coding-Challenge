import client  from './db';

const dropUsersQuery =`DROP TABLE IF EXISTS users;`
const dropTicketsQuery =`DROP TABLE IF EXISTS tickets;`

const createUsersQuery = `
  CREATE TABLE IF NOT EXISTS users (
    id serial PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN NOT NULL
  )`;

const createTicketsQuery = `
  CREATE TABLE IF NOT EXISTS tickets (
    id serial PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(255) NOT NULL,
    date_created TIMESTAMP DEFAULT NOW(),
    date_updated TIMESTAMP DEFAULT NOW()
  )`;

const seedUsersQuery = `
  INSERT INTO users (email, password, admin) VALUES
    ('user@example.com', 'user', false),
    ('admin@example.com', 'admin', true)`;

const seedTicketsQuery = `
  INSERT INTO tickets (name, email, description, status, date_created, date_updated) VALUES
    ('John Doe', 'jd@example.com', 'Complaint 1', 'new', '2023-10-26 14:30:00', '2023-10-26 14:30:00'),
    ('Alex Smith', 'ad@example.com', 'Complaint 2', 'new', '2023-10-26 14:30:00', '2023-10-26 14:30:00')`;

const seedInitialDatabase = async () => {
  try {
    await client.query(dropUsersQuery);
    await client.query(dropTicketsQuery);
    await client.query(createUsersQuery);
    await client.query(createTicketsQuery);
    await client.query(seedUsersQuery);
    await client.query(seedTicketsQuery);
    console.log('Table created and seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    process.exit();
  }
};

seedInitialDatabase();
