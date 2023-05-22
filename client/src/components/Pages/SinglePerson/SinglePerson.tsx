import React from 'react';
import { useLocation } from 'react-router-dom';

import "./SinglePerson.css";

function SinglePerson() {

  const location = useLocation();
  const { people, imageURL } = location.state;


  if (people == null) {
    return (
      <div>
        LOADING
      </div>
    )
  }

  return (
    <div>
      
      <div className="screen">
        <div className="leftsideperson">
          <div className="innerleftsideperson">
            <h1>{people.name}</h1>
            <p>Gender: {people.gender}</p>
            <p>Birth Year: {people.birth_year}</p>
            <p>Height: {people.height} cm</p>
            <p>Weight: {people.mass} kg</p>
            <p>Hair Color: {people.hair_color}</p>
            <p>Skin Color: {people.skin_color}</p>
            <p>Eye Color: {people.eye_color}</p>
            <p>Home World: {people.homeworld}</p>
          </div>
        </div>

        <div className="rightsideperson">
          <img id="personimg" src={imageURL}></img>
        </div>
      </div>

    </div>
  )
}

export default SinglePerson