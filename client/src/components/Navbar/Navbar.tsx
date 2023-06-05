import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

import './Navbar.css';


function NavBar() {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => {
      window.scrollBy({ top: -100000, left: 0, behavior: 'smooth' });
      setClick(false)
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener('resize', showButton);

  const navMenu = document.querySelector('.nav-menu');

  
  useEffect(() => {
    if (click == true) {
      document.body.classList.toggle('nav-menu-active');
    }
    else {
      document.body.classList.remove('nav-menu-active');
    }
  }, [click]);
  

  return (
    <div className='overarching-container'>
      <nav className='navbar'>
        <div className='navbar-container'>

          {/* Navbar logo */}
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            The Star Wars Codex
            <i style={{paddingLeft: '15px'}} className="fa-solid fa-book-journal-whills"></i>
          </Link>

          {/* Navbar hamburger menu */}
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>

          {/* Navbar options */}
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/films' className='nav-links' onClick={closeMobileMenu}>
                Films
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/people' className='nav-links' onClick={closeMobileMenu}>
                People
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/species' className='nav-links' onClick={closeMobileMenu}>
                Species
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/planets' className='nav-links' onClick={closeMobileMenu}>
                Planets
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/starships' className='nav-links' onClick={closeMobileMenu}>
                Starships
              </Link>
            </li>
            <li className='nav-item'>
              <Link to='/vehicles' className='nav-links' onClick={closeMobileMenu}>
                Vehicles
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>

  )
}

export default NavBar