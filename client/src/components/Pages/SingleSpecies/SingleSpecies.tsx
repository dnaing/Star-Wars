import React from 'react';
import { useLocation } from 'react-router-dom';

import "./SingleSpecies.css";

function SingleSpecies() {
  const location = useLocation();
  const { species, imageURL } = location.state;


  if (species == null) {
    return (
      <div>
        LOADING
      </div>
    )
  }

  return (
    <div>
      
      <div className="screen">
        <div className="leftsidespecies">
          <div className="innerleftsidespecies">
            <h1>{species.name}</h1>
            <p>Classification: {species.classification}</p>
            <p>Designation: {species.designation}</p>
            <p>Average Height: {species.average_height} cm</p>
            <p>Average Lifespan: {species.average_lifespan} years</p>
            <p>Hair Colors: {species.hair_colors}</p>
            <p>Skin Colors: {species.skin_colors}</p>
            <p>Eye Colors: {species.eye_colors}</p>
            <p>Language: {species.language}</p>
            <p>Home World: {species.homeworld}</p>
          </div>
        </div>

        <div className="rightsidespecies">
          <img id="speciesimg" src={imageURL}></img>
        </div>
      </div>

    </div>
  )
}

export default SingleSpecies