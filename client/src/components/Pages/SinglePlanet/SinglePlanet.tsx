import React from 'react';
import { useLocation } from 'react-router-dom';

import './SinglePlanet.css';

function SinglePlanet() {
  const location = useLocation();
  const { planets, imageURL } = location.state;


  if (planets == null) {
    return (
      <div>
        LOADING
      </div>
    )
  }

  return (
    <div>
      
      <div className="screen">
        <div className="leftsideplanet">
          <div className="innerleftsideplanet">
            <h1>{planets.name}</h1>
            <p>Diameter: {planets.diameter} kilometers</p>
            <p>Population: {planets.population}</p>
            <p>Terrain: {planets.terrain}</p>
            <p>Climate: {planets.climate}</p>
            <p>Gravity: {planets.gravity}</p>
            <p>Surface Water: {planets.surface_water} percent of planet surface</p>
            <p>Rotation Period: {planets.rotation_period} hours to complete a single rotation on its axis</p>
            <p>Orbital Period: {planets.orbital_period} days to complete a single orbit of its local star</p>
          </div>
        </div>

        <div className="rightsideplanet">
          <img id="planetimg" src={imageURL}></img>
        </div>
      </div>

    </div>
  )
}

export default SinglePlanet