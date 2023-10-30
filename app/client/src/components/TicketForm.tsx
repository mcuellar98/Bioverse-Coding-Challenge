import React, {ChangeEvent, MouseEvent, useState} from 'react';
import axios from 'axios';

const TicketForm = () => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  function isValidEmail(email: string) {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailPattern.test(email);
  }

  const buttonDisabled = [name, email, description].some((field) => field.trim().length === 0) || !isValidEmail(email);
  const buttonClass = buttonDisabled ? 'unclickable-button' : 'clickable-button';

  const handleSubmit = (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    axios.post(`/add-ticket`, {
      name: name,
      email: email,
      description: description
    })
    .then(() => {
      setName('');
      setEmail('');
      setDescription('');
      alert('Ticket Submitted')
    })
    .catch((err) => {
      console.log('Error', err);
    })
  }

  const updateName = (e: ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const updateEmail = (e: ChangeEvent<HTMLInputElement>): void  => {
    setEmail(e.target.value);
  };

  const updateDescription = (e: ChangeEvent<HTMLTextAreaElement>): void  => {
    setDescription(e.target.value);
  };

  return (
    <div id="ticket-form">
    <h1> Submit a Ticket</h1>
    <form>
      <table id='input-table'>
        <tbody>
          <tr>
            <td className="td-ticket-form form-text"><label className="input-label" htmlFor="email">Name*</label></td>
            <td className="td-ticket-form"><input type="text" id="name" name="name" required value={name} onChange={updateName}/></td>
          </tr>
          <tr>
            <td className="td-ticket-form form-text"><label className="input-label" htmlFor="email">Email*</label></td>
            <td className="td-ticket-form"><input type="email" id="email" name="email" required value={email} onChange={updateEmail}/></td>
          </tr>
          <tr>
            <td className="td-ticket-form form-text"><label className="input-label" htmlFor="submit-description">Description of Problem*</label></td>
            <td className="td-ticket-form"><textarea id="submit-description" name="description" rows={4} required value={description} onChange={updateDescription}></textarea></td>
          </tr>
          <tr>
            <td></td>
            <td id='required-text'><p>* Indicates a required field</p></td>
          </tr>
          <tr>
            <td></td>
            <td className="td-ticket-form"><button className={buttonClass} disabled={buttonDisabled} id="ticket-submit" type="submit" onClick={handleSubmit}>Submit</button></td>
          </tr>
        </tbody>
      </table>
  </form>
  </div>
  )
}

export default TicketForm;