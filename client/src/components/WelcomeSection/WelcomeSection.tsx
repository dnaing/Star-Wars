import React from 'react'

import videoBg from '../../assets/videos/hyperspace.mp4';
import image from '../../assets/images/welcomeImage.jpg';

import '../../App.css';
import './WelcomeSection.css';


function WelcomeSection() {
    return (
      <div className='welcome-container'>

          <div className='welcome-hero-container'>
            <img className='welcome-hero' src={image} loading='lazy'/>
            <div className='welcome-hero-text'>
              <h1> Welcome! </h1>
            </div>
          </div>

          {/* <img className='films-hero' src={image}/>
          <h2>Films</h2> */}

      </div>
    );
  }
  
  export default WelcomeSection;