import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './SinglePlanet.module.css';
import "../../../stylesheets/root.css";
import axios from 'axios';
import Carousel from '../../Carousel/Carousel';
import { CircularProgress } from '@mui/material';
import { IconButton } from '@mui/material';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import hostName from '../../Variables/variables';

function SinglePlanet() {
  const location = useLocation();
  const { planets, imageURL } = location.state;

  let [filmData, setFilmData] = useState<any[]>([]);
  let [peopleData, setPeopleData] = useState<any[]>([]);

  function scrollToTop() {
    window.scrollBy({ top: -100000, left: 0, behavior: 'smooth' });
  }

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


  if (planets === null) {
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
      
      <div className={styles.screen}>

        <h1>{planets.name}</h1>

        <div className={styles['screen-info']}>

          <div className={styles.leftsideplanet}>
            <p>Diameter: {planets.diameter} kilometers</p>
            <p>Population: {planets.population}</p>
            <p>Terrain: {planets.terrain}</p>
            <p>Climate: {planets.climate}</p>
            <p>Gravity: {planets.gravity}</p>
            <p>Surface Water: {planets.surface_water} percent of planet surface</p>
            <p>Rotation Period: {planets.rotation_period} hours to complete a single rotation on its axis</p>
            <p>Orbital Period: {planets.orbital_period} days to complete a single orbit of its local star</p>
          </div>

          <img id={styles.planetimg} src={imageURL} alt="Visual of the planet"></img>

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

      <IconButton id='to-top-button' onClick={scrollToTop}>
        <ExpandLessRoundedIcon/>
      </IconButton>

    </div>
  )
}

export default SinglePlanet