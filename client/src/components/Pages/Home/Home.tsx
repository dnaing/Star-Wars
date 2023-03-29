import React from 'react';

import WelcomeSection from '../../WelcomeSection/WelcomeSection';

import '../../Navbar/Navbar.css';
import './Home.css';

import welcomeImage from '../../../assets/images/welcomeImage.jpg';


function Home() {
  return (
    <>
      <div className = 'body'>
        {/* <WelcomeSection/> */}

        <div className='hero-container'>
          <img className='welcome-hero' src={welcomeImage} alt='Welcome Hero Image'/>
          <img className='welcome-hero-2' src={welcomeImage} alt='Welcome Hero Image'/>
        </div>

      </div>
    </>
  );
}

export default Home;