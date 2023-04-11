import React, { useEffect } from 'react';

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
import { useNavigate } from 'react-router-dom';

function Home() {


  const navigate = useNavigate();

  const handleSubmit = (p: string) => {
      navigate('/' + p);
  };

  function scrollToContent() {
    const filmsHero = document.getElementById('startOfContent')
    if (filmsHero) {
      filmsHero.scrollIntoView({behavior: 'smooth'});
    }
  }

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
            <img className='welcome-hero' src={welcomeImage} alt='Welcome Hero'/>
            <div className='welcome-text'>
              <h1 className='heading'>STAR WARS COMPENDIUM</h1>
              <p>Here you can find all sorts of information about the first 6 Star Wars movies</p>
              {/* Button here */}
              <Button onClick={scrollToContent}>GET STARTED</Button>
            </div>
          </div>

          {/* Container for the Films hero banner */}
          <div id='startOfContent' className='hero-container'>
            <img className='films-hero' src={filmsImage} alt='Films Hero'/>
            <div className='films-text hidden'>
              <h1 className='heading'>FILMS</h1>
              <p>The first 6 Star Wars movies are legendary works of fiction</p>
              <p>Learn more about the Star Wars prequel and original trilogies</p>
              <Button onClick={() => handleSubmit('films')}>EXPLORE</Button>
            </div>
            
            
          </div>

          {/* Container for the People hero banner */}
          <div className='hero-container'>
            <img className='people-hero' src={peopleImage} alt='People Hero'/>
            <div className='people-text hidden'>
              <h1 className='heading'>PEOPLE</h1>
              <p>Star Wars is full of amazing characters that truly give it life</p>
              <p>Learn more about these various characters found throughout the galaxy </p>
              <Button onClick={() => handleSubmit('people')}>EXPLORE</Button>
            </div>
          </div>

          {/* Container for the Species hero banner */}
          <div className='hero-container'>
            <img className='species-hero' src={speciesImage} alt='Species Hero'/>
            <div className='species-text hidden'>
              <h1 className='heading'>SPECIES</h1>
              <p>Star Wars is filled with all kinds of species</p>
              <p>Learn more about the many diverse species found throughout the universe</p>
              <Button onClick={() => handleSubmit('species')}>EXPLORE</Button>
            </div>
          </div>

          {/* Container for the Planets hero banner */}
          <div className='hero-container'>
            <img className='planets-hero' src={planetsImage} alt='Planets Hero'/>
            <div className='planets-text hidden'>
              <h1 className='heading'>PLANETS</h1>
              <p>The Star Wars universe is massive and full of all kinds of planets</p>
              <p>Learn more about these many fascinating planets found throughout the galaxy</p>
              <Button onClick={() => handleSubmit('planets')}>EXPLORE</Button>
            </div>
          </div>

          {/* Container for the Starships hero banner */}
          <div className='hero-container'>
            <img className='starships-hero' src={starshipsImage} alt='Starships Hero'/>
            <div className='starships-text hidden'>
              <h1 className='heading'>STARSHIPS</h1>
              <p>Star ships are used to traverse the ever so massive Star Wars universe</p>
              <p>Learn more about these high-speed starships used to blitz across space</p>
              <Button onClick={() => handleSubmit('starships')}>EXPLORE</Button>
            </div>
          </div>

          {/* Container for the Vehicles hero banner */}
          <div className='hero-container'>
            <img className='vehicles-hero' src={vehiclesImage} alt='Vehicles Hero'/>
            <div className='vehicles-text hidden'>
              <h1 className='heading'>VEHICLES</h1>
              <p>There are many vehicles in the Star Wars universe that come in many shapes and forms</p>
              <p>Learn more about these spectacular vehicles used to travel and get around places</p>
              <Button onClick={() => handleSubmit('vehicles')}>EXPLORE</Button>
            </div>
          </div>
             
        </div>

      </div>
     
    </>
  );
}

export default Home;