import {Request, Response } from 'express';
import models from '../models/models';
import dotenv from 'dotenv';
dotenv.config();

interface QueryResult {
  rows: Array<Object>
}

const getAllTickets = (req: Request, res: Response): void  => {
  models.getAllTickets()
  .then((results: QueryResult) => {
    res.json(results.rows)})
  .catch((err: Error) => {
    console.log('Error', err);
    res.status(500).send('An error occurred');
  })
};

const updateTicketStatus = (req: Request, res: Response): void  => {
  const id: number = req.body.id;
  const status: string = req.body.status;
  models.updateTicketStatus(id, status)
  .then(() => {
    res.send('Ticket status updated')
  })
  .catch((err: Error) => {
    console.log('Error', err);
    res.status(500).send('An error occurred');
  })
};

const addTicket = async (req: Request, res: Response): Promise<void>  => {
  const name: string = req.body.name;
  const email: string = req.body.email;
  const description: string = req.body.description;
  models.addTicket(name, email, description)
  .then(() => {
    res.send('Ticket Added')
  })
  .catch((err: Error) => {
    console.log('Error', err);
    res.status(500).send('An error occurred');
  })
};

const validateCredentials = (req: Request, res: Response): void  => {
  const email: string = req.query.email as string;
  const password: string = req.query.password as string;
  models.validateCredentials(email, password)
  .then((result: QueryResult) => {
    res.end()
  })
  .catch((err: Error) => {
    console.log('Error', err);
    res.status(500).send('An error occurred');
  })
};

const updateDate = (req: Request, res: Response): void => {
  const id: number = req.body.id;
  models.updateDate(id)
  .then((result: QueryResult) => {
    res.send('date updated')
  })
  .catch((err: Error) => {
    console.log('Error', err);
    res.status(500).send('An error occurred');
  })
};

export default {
  getAllTickets: getAllTickets,
  updateTicketStatus: updateTicketStatus,
  addTicket: addTicket,
  validateCredentials: validateCredentials,
  updateDate: updateDate,
}