import client from '../database/db';

const addTicket = async (name: string, email: string, description: string, status: string = 'new') => {
  const queryString: string = `INSERT INTO tickets (name, email, description, status) VALUES ($1, $2, $3, '${status}')`;
  await client.query(queryString, [name, email, description]);
}

const getAllTickets = () => {
  const queryString: string = `SELECT * FROM tickets`;
  return client.query(queryString);
}

const updateTicketStatus = async ( id: Number, status: String) => {
  const queryString: string = `UPDATE tickets SET status = '${status}' WHERE id = ${id}`;
  await client.query(queryString);
}

const isAdmin = (email: String, password: String) => {
  const queryString: string = `SELECT admin FROM users WHERE email = '${email}' AND password = '${password}'`
  return client.query(queryString)
}

const updateDate = (id: number) => {
  const queryString: string = `UPDATE tickets SET date_updated = NOW() WHERE id = ${id}`;
  return client.query(queryString)
}

export default {
  addTicket: addTicket,
  getAllTickets: getAllTickets,
  updateTicketStatus: updateTicketStatus,
  isAdmin: isAdmin,
  updateDate: updateDate
}