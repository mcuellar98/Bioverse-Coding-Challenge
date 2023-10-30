import React from 'react';
import PageNavigator from '../components/PageNavigator';

const HomePage = () => {
  return (
    <div className='background'>
      <div id='homepage-container'>
        <p id='bioverse'>BIOVERSE</p>
        <PageNavigator/>
      </div>
    </div>
  )
}

export default HomePage