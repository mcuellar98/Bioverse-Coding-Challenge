import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import bodyParser from 'body-parser';
import controllers from './controllers/controllers'
import compression from 'compression';
dotenv.config();

const app: Express = express();
const port: String | Number = process.env.PORT || 3001;

app.use(express.json());
app.use(compression());
app.use(express.static(path.resolve(__dirname, '../../client/dist')))
app.use(bodyParser.json())

app.get('/ticket-table', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.get('/add-ticket', (req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

app.get('/tickets', controllers.getAllTickets);

app.get('/user', controllers.isAdmin);

app.put('/update-ticket', controllers.updateTicketStatus);

app.post('/add-ticket', controllers.addTicket);

app.put('/update-date', controllers.updateDate);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});