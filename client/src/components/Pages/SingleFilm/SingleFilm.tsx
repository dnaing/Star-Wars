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
        <div className="leftside">
          <div className="innerleftside">
            <h1>{film.title}</h1>
            <p>Directed By: {film.director}</p>
            <p>Produced By: {film.producer}</p>
            <p>Release Date: {film.release_date}</p>
            <p id='opening'>{film.opening_crawl}</p>
          </div>
        </div>

        <div className="rightside">
          <img id="img" src={imageURL}></img>
        </div>
      </div>

    </div>
  )
}

export default SingleFilm