import React from 'react';

import WelcomeSection from '../../WelcomeSection/WelcomeSection';
import Button from 'react-bootstrap/Button';

import '../../Navbar/Navbar.css';
import './Home.css';

import welcomeImage from '../../../assets/images/starwars.jpg';
import filmsImage from '../../../assets/images/films.jpg';
import peopleImage from '../../../assets/images/homeBanner.jpg';


function scrollToContent() {
  const filmsHero = document.getElementById('startOfContent')
  if (filmsHero) {
    filmsHero.scrollIntoView({behavior: 'smooth'});
  }
}

function Home() {
  return (
    <>
      {/* Div to hold the entire body */}
      <div className = 'body'>

        {/* Container for all hero containers */}
        <div className='heros-container'> 

          {/* Container for the Welcome hero banner */}
          <div>
            <img className='welcome-hero' src={welcomeImage} alt='Welcome Hero Image'/>
            <div className='welcome-text'>
              <h1>STAR WARS COMPENDIUM</h1>
              <p>Here you can find all sorts of information about the first 6 Star Wars movies</p>
              {/* Button here */}
              <Button onClick={scrollToContent}>GET STARTED</Button>
            </div>
          </div>

          {/* Container for the Films hero banner */}
          <div id='startOfContent'>
            <img className='films-hero' src={filmsImage} alt='Films Hero Image'/>
          </div>

          {/* Container for the People hero banner */}
          <div>
            <img className='people-hero' src={peopleImage} alt='Films Hero Image'/>
          </div>
          
          
        </div>

      </div>
    </>
  );
}

export default Home;