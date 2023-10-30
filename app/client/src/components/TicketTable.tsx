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
  const ascending = useRef(false);
  const currentSortField = useRef('date_updated');
  const previousSortField = useRef('date_updated');

  const statusMap: { [key: string]: number } = {
    'new': 1,
    'in_progress': 2,
    'resolved': 3,
  };

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

  const sortTickets = (field: string):void => {
    currentSortField.current = field;
    const sortedTickets: Ticket[]= _.sortBy(tickets, (ticket: Ticket) => {
      if (field === 'date_created' || field === 'date_updated') {
        return new Date(ticket[field])
      } else if (field === 'status') {
        return (statusMap[ticket.status]);
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

  const sortStatusAfterUpdating = (): void => {
    if (currentSortField.current === 'status'){
      axios.get('/tickets')
      .then((results) => {
        const sortedTickets: Ticket[]= results.data.sort((a: Ticket, b: Ticket) => {return statusMap[a.status] - statusMap[b.status]})
        ascending.current ? sortedTickets : sortedTickets.reverse() ;
        setTickets(sortedTickets);
      })
      .catch((err) => {
        console.log('Error', err)
      })
    }
  }

  const sortDateAfterUpdating = (): void => {
    if (currentSortField.current === 'date_updated'){
      axios.get('/tickets')
      .then((results) => {
        // const sortedTickets: Ticket[]= results.data.sort((a: Ticket, b: Ticket) => {return a.date_updated - b.date_updated})
        const sortedTickets = _.sortBy((results.data), (ticket) => {
          return  (ticket.date_updated);
        })
        console.log(sortedTickets)
        ascending.current ? sortedTickets : sortedTickets.reverse() ;
        setTickets(sortedTickets);
      })
      .catch((err) => {
        console.log('Error', err)
      })
    }
  }

  const getIcon = (field: string): React.ReactNode => {
    if (currentSortField.current === field && ascending.current) {
      return <FaSortUp/>;
    } else if (currentSortField.current === field && !ascending.current) {
      return <FaSortDown/>;
    } else {
      return <FaSort/>;
    }
  }

  return (
    <div style={{width:'100%'}}>
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
          {tickets.map((ticket:Ticket) => {return <TicketTableRow key={ticket.id} sortStatusAfterUpdating={sortStatusAfterUpdating} ticket={ticket} setModalTicket={setModalTicket} setModalVisible={setModalVisible}/>})}
        </tbody>
        <colgroup>
          <col style={{width: '20px'}}/>
          <col/>
          <col/>
        </colgroup>
      </table>
      {modalVisible ?
      <div>
        <MessageModal modalTicket={modalTicket} setModalVisible={setModalVisible} sortDateAfterUpdating={sortDateAfterUpdating}/>
        <div id="blur" onClick={() => {setModalVisible(false)}}/>
      </div>
      : null}
    </div>
  )
}

export default TicketTable;
