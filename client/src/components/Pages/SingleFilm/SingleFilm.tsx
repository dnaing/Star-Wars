import React from 'react';
import { useLocation } from 'react-router-dom';

import "./SingleFilm.css";



function SingleFilm() {

  const location = useLocation();
  const { film, imageURL } = location.state;


  
  if (film == null) {
    return (
      <div>
        LOADING
      </div>
    )
  }

  return (
    <div>
      
      <div className="screen">
        {film.title}
      </div>

    </div>
  )
}

export default SingleFilm