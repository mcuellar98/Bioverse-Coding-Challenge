import React, { useState, MouseEvent, ChangeEvent } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPortal = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const updateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e:MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const queryParams = {
      email: email,
      password: password
    };
    axios('/login', {
      params: queryParams
    })
    .then((result) => {
      console.log(result);
      if (result.data.length === 0) {
        alert('Email or Password is Incorrect');
      } else {
        console.log(result.data[0])
        if (result.data[0].admin) {
          navigate('/ticket-table');
        } else if (!result.data[0].admin) {
          navigate('/add-ticket');
        }
      }
    })
    .catch((err) => {
      console.log('Error', err)
    })
    setEmail('');
    setPassword('');
  };

  return (
    <div>
      <form>
        <label htmlFor='email'>Email</label>
        <input type='text' name='email' value={email} onChange={updateEmail}/>
        <br/>
        <label htmlFor='password'>Password</label>
        <input type='text' name='password' value={password} onChange={updatePassword}/>
        <button onClick={handleSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default LoginPortal;