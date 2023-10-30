import React from 'react';
import Header from '../components/Header';
import TicketTable from '../components/TicketTable';

const AdminTickets = () => {
  return (
    <div id='ticket-table-page'>
      <Header/>
      <div id='ticket-table-div'>
        <h1> Tickets</h1>
        <TicketTable/>
      </div>
    </div>
  )
};

export default AdminTickets;