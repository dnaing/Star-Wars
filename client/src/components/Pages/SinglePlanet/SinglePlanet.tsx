import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './SinglePlanet.css';
import "../../../stylesheets/root.css";
import axios from 'axios';
import Carousel from '../../Carousel/Carousel';
import { CircularProgress } from '@mui/material';

function SinglePlanet() {
  const location = useLocation();
  const { planets, imageURL } = location.state;
  const hostName = 'http://localhost:4000';

  let [filmData, setFilmData] = useState<any[]>([]);
  let [peopleData, setPeopleData] = useState<any[]>([]);

  useEffect(() => {
    if (planets) {
      axios.get(hostName + '/films/featured', {
        params: {
          data: planets.films
        }
      })
      .then((res) => {
          setFilmData(res.data);
      })
    }
  }, [planets]);

  useEffect(() => {
    if (planets) {
      axios.get(hostName + '/people/featured', {
        params: {
          data: planets.residents
        }
      })
      .then((res) => {
          setPeopleData(res.data);
      })
    }
  }, [planets]);


  if (planets == null) {
    console.log("HELLO");
    return (
      <div>
        <div className="loading">
          <CircularProgress size="15rem"/>
        </div>
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


      {
        filmData.length > 0
        ? <div className="filmNavigation">
            <Carousel {...{dataList: filmData, dataType: 'films', source: 'Planets'}} />
          </div>
        : <div></div>
      }

      {
        peopleData.length > 0
        ? <div className="peopleNavigation">
            <Carousel {...{dataList: peopleData, dataType: 'people', source: 'Planets'}} />
          </div>
        : <div></div>
      }

    </div>
  )
}

export default SinglePlanet