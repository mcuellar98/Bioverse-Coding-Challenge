import React from "react";
import AdminTickets from "../pages/AdminTickets";
import SubmitTicket from "../pages/SubmitTicket";
import { useNavigate } from 'react-router-dom';

const PageNavigator = () => {

  const navigate = useNavigate();

  const ticketsRedirect = (): void => {
    navigate('/ticket-table');
  }

  const formRedirect = (): void => {
    navigate('/add-ticket');
  }

  return (
    <div id='navigation-buttons-container'>
      <button className='navigation-buttons' onClick={formRedirect}>Submit a Ticket</button>
      <button className='navigation-buttons' onClick={ticketsRedirect}>See Tickets</button>
    </div>
  )
}

export default PageNavigator