import React from 'react';
import { useLocation } from 'react-router-dom';

import "./SingleFilm.css";

function SingleFilm() {

  const location = useLocation();
  const { film } = location.state;

  if (film == null) {
    return (
      <div>
        LOADING
      </div>
    )
  }

  return (
    <div style={{color: "white"}}>
      {film.title}
    </div>
  )
}

export default SingleFilm