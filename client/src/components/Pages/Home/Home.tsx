import React, { useEffect } from 'react';

import WelcomeSection from '../../WelcomeSection/WelcomeSection';
import Button from 'react-bootstrap/Button';

import '../../Navbar/Navbar.css';
import './Home.css';

import welcomeImage from '../../../assets/images/starwars.jpg';
import filmsImage from '../../../assets/images/films.jpg';
import peopleImage from '../../../assets/images/people.jpg';
import speciesImage from '../../../assets/images/species.jpg';
import planetsImage from '../../../assets/images/planets.jpg';
import starshipsImage from '../../../assets/images/starships.jpg';
import vehiclesImage from '../../../assets/images/vehicles.jpg';

function scrollToContent() {
  const filmsHero = document.getElementById('startOfContent')
  if (filmsHero) {
    filmsHero.scrollIntoView({behavior: 'smooth'});
  }
}



function Home() {


  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          const classList = entry.target.classList;
          if (entry.isIntersecting) {
              if (classList.contains('films-text') || classList.contains('species-text') || classList.contains('starships-text')) {
                entry.target.classList.add('slide-left');
              }

              else {
                entry.target.classList.add('slide-right');
              }
          } 
          else {
              if (classList.contains('slide-left')) {
                entry.target.classList.remove('slide-left');
              }
              if (classList.contains('slide-right')) {
                entry.target.classList.remove('slide-right');
              }
          }
      });
    });
  
    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((element) => observer.observe(element));
  }, []);

  return (
    <>
      
      {/* Div to hold the entire body */}
      <div className = 'body'>

        {/* Container for all hero containers */}
        <div className='heros-container'> 

          {/* Container for the Welcome hero banner */}
          <div className='hero-container'>
            <img className='welcome-hero' src={welcomeImage} alt='Welcome Hero Image'/>
            <div className='welcome-text'>
              <h1 className='heading'>STAR WARS COMPENDIUM</h1>
              <p>Here you can find all sorts of information about the first 6 Star Wars movies</p>
              {/* Button here */}
              <Button onClick={scrollToContent}>GET STARTED</Button>
            </div>
          </div>

          {/* Container for the Films hero banner */}
          <div id='startOfContent' className='hero-container'>
            <img className='films-hero' src={filmsImage} alt='Films Hero Image'/>
            <div className='films-text hidden'>
              <h1 className='heading'>FILMS</h1>
              <p>Learn about the amazing 6 Star Wars movies</p>
            </div>
            
          </div>

          {/* Container for the People hero banner */}
          <div className='hero-container'>
            <img className='people-hero' src={peopleImage} alt='People Hero Image'/>
            <div className='people-text hidden'>
              <h1 className='heading'>PEOPLE</h1>
              <p>Learn about the amazing characters found within the star wars galaxy</p>
            </div>
          </div>

          {/* Container for the Species hero banner */}
          <div className='hero-container'>
            <img className='species-hero' src={speciesImage} alt='Species Hero Image'/>
            <div className='species-text hidden'>
              <h1 className='heading'>SPECIES</h1>
              <p>Learn about the amazing characters found within the star wars galaxy</p>
            </div>
          </div>

          {/* Container for the Planets hero banner */}
          <div className='hero-container'>
            <img className='planets-hero' src={planetsImage} alt='Planets Hero Image'/>
            <div className='planets-text hidden'>
              <h1 className='heading'>PLANETS</h1>
              <p>Learn about the amazing characters found within the star wars galaxy</p>
            </div>
          </div>

          {/* Container for the Starships hero banner */}
          <div className='hero-container'>
            <img className='starships-hero' src={starshipsImage} alt='Starships Hero Image'/>
            <div className='starships-text hidden'>
              <h1 className='heading'>STARSHIPS</h1>
              <p>Learn about the amazing characters found within the star wars galaxy</p>
            </div>
          </div>

          {/* Container for the Vehicles hero banner */}
          <div className='hero-container'>
            <img className='vehicles-hero' src={vehiclesImage} alt='Vehicles Hero Image'/>
            <div className='vehicles-text hidden'>
              <h1 className='heading'>VEHICLES</h1>
              <p>Learn about the amazing characters found within the star wars galaxy</p>
            </div>
          </div>
             
        </div>

      </div>
     
    </>
  );
}

export default Home;