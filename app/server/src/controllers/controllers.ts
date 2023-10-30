import express, {Request, Response } from 'express';
import models from './../models/models';

interface QueryResult {
  rows: Array<Object>
}

const getAllTickets = (req: Request, res: Response) => {
  models.getAllTickets()
  .then((results: QueryResult) => {
    res.json(results.rows)})
  .catch((err: Error) => {
    console.log('Error', err);
    res.status(500).send('An error occurred');
  })
};

const updateTicketStatus = (req: Request, res: Response) => {
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

const addTicket = async (req: Request, res: Response) => {
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

const isAdmin = (req: Request, res: Response) => {
  const email: string = req.body.email;
  const password: string = req.body.password;
  models.isAdmin(email, password)
  .then((result: QueryResult) => {
    res.send(result.rows);
  })
  .catch((err: Error) => {
    console.log('Error', err);
    res.status(500).send('An error occurred');
  })
};

const updateDate = (req: Request, res: Response) => {
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
  isAdmin: isAdmin,
  updateDate: updateDate
}