import React, {useState, ChangeEvent, MouseEvent} from "react";
import axios from 'axios';

const MessageModal:  React.FC<MessageModalProps>= ({modalTicket, setModalVisible}) => {

  const [response, setResponse] = useState<string>('');

  const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setResponse(e.target.value);
  }

  const handleSubmit = (e:MouseEvent<HTMLButtonElement>) => {
    console.log(`Would normally send email here with body: ${response}`)
    setResponse('');
    alert('Response Sent');
    axios.put('/update-date', {
      id: modalTicket?.id,
    })
    .then(() => {
      setModalVisible(false);
    })
    .catch((err) => {
      console.log('Error', err);
    });
  }

  return (
    <div id="message-modal">
        <p id='modal-description'>{`Problem Description:`}</p>
        <div id='modal-description-container'>
          <p id='modal-description'>{modalTicket?.description}</p>
        </div>
        <textarea id="modal-textarea" placeholder={'Type reply here.'} value={response} onChange={handleInputChange}></textarea>
        <div id="modal-button-container">
          <button className="modal-button" onClick={handleSubmit}>Send Message</button>
          <button className="modal-button" onClick={() => {setModalVisible(false)}}>Cancel</button>
        </div>
    </div>
  )
}

export default MessageModal;