import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import "./SinglePerson.css";
import axios from 'axios';

function SinglePerson() {

  let [homeworldData, setHomeworldData] = useState<any[]>([]);
  const location = useLocation();
  const { people, imageURL } = location.state;
  const hostName = 'http://localhost:4000';

  useEffect(() => {

      axios.get(hostName + '/planets/' + people.homeworld)
      .then((res) => {
          setHomeworldData(res.data);
      })
  
  }, []);


  if (people == null || homeworldData.length == 0) {
    return (
      <div>
        LOADING
      </div>
    )
  }

  console.log(homeworldData);

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
            <p>Home World:{' '}  
            <Link to={`/planets/${homeworldData.at(0).name.replace(/\s+/g, '')}`} 
                  state={ { planets: homeworldData.at(0), 
                            imageURL: "https://storage.cloud.google.com/starwars_planets_imgs/" + homeworldData.at(0).name.replace(/\s+/g, '') + ".jpg" 
                          } 
                        } style={{ textDecoration: 'none' }}>
              {people.homeworld}
            </Link>
            </p>
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