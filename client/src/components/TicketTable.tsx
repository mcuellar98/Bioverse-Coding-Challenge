import React, { useState, useEffect, useRef } from "react";
import axios, { AxiosResponse } from 'axios';
import TicketTableRow from './TicketTableRow';
import _ from 'underscore';
import MessageModal from "./MessageModal";
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa';

const TicketTable = () => {

  const [tickets, setTickets] = useState<Ticket[]>([])
  const [modalVisible, setModalVisible] = useState<boolean>(false)
  const [modalTicket, setModalTicket] = useState<Ticket>();
  const [icon, setIcon] = useState(<FaSort/>);
  const ascending = useRef(false);
  const currentSortField = useRef('date_updated');
  const previousSortField = useRef('date_updated');

  useEffect(() => {
    axios.get('/tickets')
    .then((results: AxiosResponse<Ticket[]>) => {
      const sortedTickets: Ticket[]= _.sortBy(results.data, (ticket: Ticket) => {
        return -(new Date(ticket[previousSortField.current]));
      })
      setTickets(sortedTickets);
    })
    .catch((err) => {
      console.log('Error', err);
    })
  }, [])

  const sortTickets = (field: string) => {
    currentSortField.current = field;
    const sortedTickets: Ticket[]= _.sortBy(tickets, (ticket: Ticket) => {
      if (field === 'date_created' || field === 'date_updated') {
        return new Date(ticket[field])
      } else if (typeof(ticket[field]) === 'string') {
        return ticket[field].toLowerCase();
      } else {
        return ticket[field];
      }
    })
    if (field === previousSortField.current) {
      ascending.current = !ascending.current;
    } else {
      ascending.current = false;
    }
    ascending.current ? sortedTickets : sortedTickets.reverse() ;
    previousSortField.current = field;
    setTickets(sortedTickets);
  }

  const getIcon = (field: string) => {
    if (currentSortField.current === field && ascending.current) {
      return <FaSortUp/>;
    } else if (currentSortField.current === field && !ascending.current) {
      return <FaSortDown/>;
    } else {
      return <FaSort/>;
    }
  }

  return (
    <div>
      <table id="tickets-table">
        <thead>
          <tr id="header-row">
            <th className="ticket-table-header" onClick={() => {sortTickets('id')}}>Ticket ID {getIcon('id')}</th>
            <th className="ticket-table-header" onClick={() => {sortTickets('name')}}>Name {getIcon('name')}</th>
            <th className="ticket-table-header" onClick={() => {sortTickets('email')}}>Email {getIcon('email')}</th>
            <th className="ticket-table-header" onClick={() => {sortTickets('description')}}>Problem Description {getIcon('description')}</th>
            <th className="ticket-table-header" onClick={() => {sortTickets('status')}}>Status {getIcon('status')}</th>
            <th className="ticket-table-header" onClick={() => {sortTickets('date_created')}}>Date Created {getIcon('date_created')}</th>
            <th className="ticket-table-header" onClick={() => {sortTickets('date_updated')}}>Date Updated {getIcon('date_updated')}</th>
            <th id="empty-square"></th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket:Ticket) => {return <TicketTableRow key={ticket.id} ticket={ticket} setModalTicket={setModalTicket} setModalVisible={setModalVisible}/>})}
        </tbody>
        <colgroup>
          <col style={{width: '20px'}}/>
          <col/>
          <col/>
        </colgroup>
      </table>
      {modalVisible ?
      <div>
        <MessageModal modalTicket={modalTicket} setModalVisible={setModalVisible}/>
        <div id="blur" onClick={() => {setModalVisible(false)}}/>
      </div>
      : null}
    </div>
  )
}

export default TicketTable;
