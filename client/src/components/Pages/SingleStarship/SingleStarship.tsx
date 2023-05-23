import React from 'react';
import { useLocation } from 'react-router-dom';

import './SingleStarship.css';

function SingleStarship() {
  const location = useLocation();
  const { starships, imageURL } = location.state;

  if (starships == null) {
    return (
      <div>
        LOADING
      </div>
    )
  }

  return (
    <div>
      
      <div className="screen">
        <div className="leftsidestarship">
          <div className="innerleftsidestarship">
            <h1>{starships.name}</h1>
            <p>Model: {starships.model}</p>
            <p>Manufacturer: {starships.manufacturer}</p>
            <p>Starship Class: {starships.starship_class}</p>
            <p>Cost: {starships.cost_in_credits} credits</p>
            <p>Length: {starships.length} meters</p>
            <p>Max Atmosphering Speed: {starships.max_atmosphering_speed}</p>
            <p>Crew: {starships.crew}</p>
            <p>Passengers: {starships.passengers}</p>
            <p>Cargo Capacity: {starships.cargo_capacity} kilograms</p>
            <p>Consumables: {starships.consumables}</p>
            <p>Hyperdrive Rating: {starships.hyperdrive_rating}</p>
            <p>MGLT: {starships.MGLT} maximum megalights per hour</p>
          </div>
        </div>

        <div className="rightsidestarship">
          <img id="starshipimg" src={imageURL}></img>
        </div>
      </div>

    </div>
  )
}

export default SingleStarship