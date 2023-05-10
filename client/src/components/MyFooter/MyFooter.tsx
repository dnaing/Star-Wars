import React from 'react';
import './MyFooter.css';

function MyFooter() {
  return (
    <div>
      <footer id='footer'>
        <div id='footer-header'>
          <p>Check me out at <a href="https://www.linkedin.com/in/derek-naing-2567b11a8/">Linked In</a> | <a href="https://github.com/dnaing">Github</a></p>
        </div>
        <div id='footer-container'>
          <p>Star Wars and all associated names and/or images are copyright Lucasfilm Ltd. Images and pictures were freely collected from <a href="https://starwars.fandom.com/wiki/Main_Page">Wookiepedia</a>.</p>
        </div>
      </footer>
    </div>
  )
}

export default MyFooter