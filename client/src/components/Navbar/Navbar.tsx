import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../Button/Button';
import './Navbar.css';

import navBarLogo from '../../assets/images/jedi_order.png';

function NavBar() {

  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  window.addEventListener('resize', showButton);

  return (
    <div className='overarching-container'>
      <nav className='navbar'>
        <div className='navbar-container'>

          {/* Navbar logo */}
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Star Wars Compendium 
            <i className='fab fa-typo3'/>
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
            {/* <li className='nav-item'>
              <Link to='/sign-up' className='nav-links-mobile' onClick={closeMobileMenu}>
                Sign Up
              </Link>
            </li> */}
          </ul>

          {/* {button & <Button buttonStyle='btn--outline'>SIGN UP</Button>} */}
        </div>
      </nav>
    </div>

  )
}

export default NavBar