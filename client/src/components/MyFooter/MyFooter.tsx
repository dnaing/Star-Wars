import React from 'react';
import './MyFooter.css';

import linkedInImage from '../../assets/images/linkedin.png';
import githubImage from '../../assets/images/github.png';

function MyFooter() {
  return (
    <div>
      <footer id='footer'>
        <div id='footer-header'>
          <p className='footer-text'>Check me out at <a href="https://www.linkedin.com/in/derek-naing-2567b11a8/"><img className='footer-icons' src={linkedInImage} alt='linked in'/></a> | <a href="https://github.com/dnaing"><img className='footer-icons' src={githubImage} alt='github'/></a></p>
        </div>
        <div id='footer-container'>
          <p className='footer-text'>This website uses images freely collected from <a href="https://starwars.fandom.com/wiki/Main_Page">Wookiepedia</a>, a fan-driven Star Wars wiki</p>
        </div>
      </footer>
    </div>
  )
}

export default MyFooter