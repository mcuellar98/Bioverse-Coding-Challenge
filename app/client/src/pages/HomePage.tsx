import React from 'react';
import PageNavigator from '../components/PageNavigator';
import LoginPortal from '../components/LoginPortal';

const HomePage = () => {
  return (
    <div className='background'>
      <div id='homepage-container'>
        <p id='bioverse'>BIOVERSE</p>
        {/* <PageNavigator/> */}
        <LoginPortal/>
      </div>
    </div>
  )
}

export default HomePage