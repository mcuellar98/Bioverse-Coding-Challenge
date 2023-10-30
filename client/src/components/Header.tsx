import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = () => {

  const navigate = useNavigate();

  return (
    <header id="header">
      <p id='header-title' onClick={() => {navigate('/')}}>BIOVERSE</p>
    </header>
  )
};

export default Header;