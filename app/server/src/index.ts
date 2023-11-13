import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import controllers from './controllers/controllers'
import compression from 'compression';
import cookieParser from "cookie-parser";
import sessions from 'express-session';
dotenv.config();

const app: Express = express();
const port: String | Number = process.env.PORT || 3000;

app.use(express.json());
app.use(compression());
app.use(express.static(path.resolve(__dirname, '../../client/dist')))
// app.use(express.static(__dirname));
// app.use(express.static(path.join(__dirname, "js")));
app.use(bodyParser.json())
const oneDay: number = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: process.env.TOKEN as string,
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));
app.use(express.urlencoded({ extended: true }));

app.get('/ticket-table', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  // res.send('test');
});

app.get('/add-ticket', (req, res) => {
  console.log(req.session);
  console.log(req.headers)
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.get('/', (req, res) => {
  // res.send('test')
  // res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.get('/tickets', controllers.getAllTickets);

app.get('/login', controllers.validateCredentials);

app.put('/update-ticket', controllers.updateTicketStatus);

app.post('/add-ticket', controllers.addTicket);

app.put('/update-date', controllers.updateDate);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});