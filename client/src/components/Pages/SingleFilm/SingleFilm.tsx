import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import "./SingleFilm.css";
import { Grid } from '@mui/material';
import FilmCard from '../../FilmCard/FilmCard';
import axios from 'axios';
import GeneralCard from '../../GeneralCard/GeneralCard';
import Carousel from '../../Carousel/Carousel';

function SingleFilm() {

  const location = useLocation();
  const { film, imageURL } = location.state;
  const hostName = 'http://localhost:4000';

  let [peopleData, setPeopleData] = useState<any[]>([]);

  // Get featured character data
  useEffect(() => {
    if (film) {
      axios.get(hostName + '/people/featured', {
        params: {
            data: film.characters
        }
      })
      .then((res) => {
          setPeopleData(res.data);
      })
    }
  }, [film]);

  //TODO: Get all the other featured data
  //...


  
  if (film == null || peopleData.length == 0) {
    return (
      <div>
        LOADING
      </div>
    )
  }


  return (
    <div> 
      <div className="screen">
        <div className="leftsidefilm">
          <div className="innerleftsidefilm">
            <h1>{film.title}</h1>
            <p>Directed By: {film.director}</p>
            <p>Produced By: {film.producer}</p>
            <p>Release Date: {film.release_date}</p>
            <p id='opening'>{film.opening_crawl}</p>
          </div>
        </div>

        <div className="rightsidefilm">
          <img id="filmimg" src={imageURL}></img>
        </div>
      </div>

      {/* Insert routings */}

      <div className="characterNavigation">
        <Carousel {...{dataList: peopleData}} />
      </div>

      <div className="speciesNavigation">
      </div>

      <div className="planetNavigation"> 
      </div>

      <div className="starshipNavigation">
      </div>

      <div className="vehicleNavigation">
      </div>

    </div>
  )
}

export default SingleFilm