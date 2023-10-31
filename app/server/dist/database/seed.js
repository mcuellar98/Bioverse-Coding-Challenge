"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("./db"));
const dropUsersQuery = `DROP TABLE IF EXISTS users;`;
const dropTicketsQuery = `DROP TABLE IF EXISTS tickets;`;
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
    ('John Doe', 'jd@example.com', 'I need assistance with account login.', 'new', '2023-10-26 14:30:00', '2023-10-26 14:30:00'),
    ('Alex Smith', 'ad@example.com', 'My computer keeps freezing.', 'new', '2023-10-26 14:30:00', '2023-10-26 14:30:00'),
    ('Alice Smith', 'alice@example.com', 'Issue with Product A', 'new', '2023-10-27 10:45:00', '2023-10-27 10:45:00'),
    ('Bob Johnson', 'bob@example.com', 'Login Problems', 'in_progress', '2023-10-28 09:15:00', '2023-10-28 09:15:00'),
    ('Ella Davis', 'ella@example.com', 'Computer Crashes Frequently', 'resolved', '2023-10-29 16:20:00', '2023-10-30 14:30:00'),
    ('David White', 'david@example.com', 'Billing Inquiry', 'new', '2023-10-30 13:00:00', '2023-10-30 13:00:00'),
    ('Grace Wilson', 'grace@example.com', 'Website Error', 'resolved', '2023-10-31 11:30:00', '2023-10-31 12:45:00')`;
const seedInitialDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.query(dropUsersQuery);
        yield db_1.default.query(dropTicketsQuery);
        yield db_1.default.query(createUsersQuery);
        yield db_1.default.query(createTicketsQuery);
        yield db_1.default.query(seedUsersQuery);
        yield db_1.default.query(seedTicketsQuery);
        console.log('Table created and seeded successfully.');
    }
    catch (error) {
        console.error('Error seeding database:', error);
    }
    finally {
        process.exit();
    }
});
seedInitialDatabase();
