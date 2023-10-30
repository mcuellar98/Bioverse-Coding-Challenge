import React, {useState, ChangeEvent} from 'react';
import axios from 'axios';

const StatusSelect: React.FC<StatusSelectProps>  = ({ticket}) => {

  const [status, setStatus] = useState(ticket.status)

  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    axios.put('/update-ticket', {
      id: ticket.id,
      status: newStatus
    })
    .then(() => {
      setStatus(newStatus);
    })
    .catch((err) => {
      console.log('Error', err);
    });
  }

  return (
    <select className='status-select' value={status} onChange={handleSelect}>
      <option value="new">New</option>
      <option value="in_progress">In Progress</option>
      <option value="resolved">Resolved</option>
    </select>
  )
}

export default StatusSelect;