import React, {SetStateAction} from 'react';
import moment from 'moment';
import StatusSelect from './StatusSelect';
import axios from 'axios';

const TicketTableRow: React.FC<TicketTableRowProps>  = ({ticket, setModalTicket, setModalVisible}) => {
  const handleClick = () => {
    setModalVisible(true);
    setModalTicket(ticket);
  };

  return (
    <tr className='ticket-row'>
      <td className='ticket-data'>{ticket.id.toString()}</td>
      <td className='ticket-data'>{ticket.name}</td>
      <td className='ticket-data'>{ticket.email}</td>
      <td className='ticket-data ticket-description clickable' onClick={handleClick}>{ticket.description}</td>
      <td className='ticket-data ticket-status'><StatusSelect ticket={ticket}/></td>
      <td className='ticket-data'>{moment(ticket.date_created).format("M/D/YYYY")}</td>
      <td className='ticket-data'>{moment(ticket.date_updated).format("M/D/YYYY")}</td>
      <td className='ticket-data clickable' onClick={handleClick}>Reply</td>
    </tr>
  )
}

export default TicketTableRow;