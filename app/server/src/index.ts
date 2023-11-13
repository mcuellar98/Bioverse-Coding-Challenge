import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import controllers from './controllers/controllers'
import compression from 'compression';
import cookieParser from "cookie-parser";
import session, { SessionData } from 'express-session';
import pgSession from 'connect-pg-simple'
import {Pool} from 'pg';
dotenv.config();

interface PgSessionOptions {
  pool: Pool;
  tableName: string;
}

// interface CustomCookieOptions extends express.CookieOptions {
//   maxAge: number;
//   name?: string;
// }

interface MySessionData extends session.SessionData {
  access?: string;
}

const sessionDBaccess = new Pool({
    user: 'michaelcuellar',
    host: 'localhost',
    database: 'bioverse',
    port: 5432,
})
const pgSessionOptions: PgSessionOptions = {
  pool: sessionDBaccess,
  tableName: 'session'
}
const app: Express = express();
const port: String | Number = process.env.PORT || 3000;

app.use(express.json());
app.use(compression());
app.use(express.static(path.resolve(__dirname, '../../client/dist')))
app.use(bodyParser.json())

const oneDay: number = 1000 * 60 * 60 * 24;

app.use(session({
    store: new (pgSession(session))({
      ...pgSessionOptions,
    }),
    secret: process.env.TOKEN as string,
    saveUninitialized:true,
    cookie: {
      maxAge: oneDay},
      // name: 'cookie name here'
    // } as CustomCookieOptions,
    resave: false
}));
app.use(express.urlencoded({ extended: true }));

app.get('/ticket-table', (req, res) => {
  if (req.session.user && req.session.user.admin) {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  } else {
    res.send('Unauthorized');
  }
});

app.get('/add-ticket', (req, res) => {
  if (req.session.user && !req.session.user.admin) {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  } else {
    res.send('Unauthorized');
  }
});

app.get('/', (req, res) => {
  // if (req.session.user && req.session.user.admin) {
  //   res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  // } else {
  //   res.send('Unauthorized');
  // }
});

app.get('/tickets', controllers.getAllTickets);

app.get('/login', controllers.validateCredentials);

app.put('/update-ticket', controllers.updateTicketStatus);

app.post('/add-ticket', controllers.addTicket);

app.put('/update-date', controllers.updateDate);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});