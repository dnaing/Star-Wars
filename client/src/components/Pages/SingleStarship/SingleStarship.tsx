import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './SingleStarship.module.css';
import "../../../stylesheets/root.css";
import axios from 'axios';
import Carousel from '../../Carousel/Carousel';
import { CircularProgress } from '@mui/material';
import { IconButton } from '@mui/material';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import hostName from '../../Variables/variables';

function SingleStarship() {
  const location = useLocation();
  const { starships, imageURL } = location.state;

  let [filmData, setFilmData] = useState<any[]>([]);
  let [peopleData, setPeopleData] = useState<any[]>([]);

  function scrollToTop() {
    window.scrollBy({ top: -100000, left: 0, behavior: 'smooth' });
  }

  scrollToTop();

  useEffect(() => {
    if (starships) {
      axios.get(hostName + '/films/featured', {
        params: {
          data: starships.films
        }
      })
      .then((res) => {
          setFilmData(res.data);
      })
    }
  }, [starships]);

  useEffect(() => {
    if (starships) {
      axios.get(hostName + '/people/featured', {
        params: {
          data: starships.pilots
        }
      })
      .then((res) => {
          setPeopleData(res.data);
      })
    }
  }, [starships]);

  if (starships === null) {
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

        <h1>{starships.name}</h1>

        <div className={styles['screen-info']}>
          <div className={styles.leftsidestarship}>
            <p>Model: {starships.model}</p>
            <p>Manufacturer: {starships.manufacturer}</p>
            <p>Starship Class: {starships.starship_class}</p>
            <p>Cost: {starships.cost_in_credits} credits</p>
            <p>Length: {starships.length} meters</p>
            <p>Max Atmosphering Speed: {starships.max_atmosphering_speed} kilometers per hour</p>
            <p>Crew: {starships.crew}</p>
            <p>Passengers: {starships.passengers}</p>
            <p>Cargo Capacity: {starships.cargo_capacity} kilograms</p>
            <p>Consumables: {starships.consumables}</p>
            <p>Hyperdrive Rating: {starships.hyperdrive_rating}</p>
            <p>MGLT: {starships.MGLT} maximum megalights per hour</p>
          </div>

          <img id={styles.starshipimg} src={imageURL} alt="Visual of the starship"></img>
        </div>

      </div>

      {
        filmData.length > 0
        ? <div className="filmNavigation">
            <Carousel {...{dataList: filmData, dataType: 'films', source: 'Starships'}} />
          </div>
        : <div></div>
      }

      {
        peopleData.length > 0
        ? <div className="peopleNavigation">
            <Carousel {...{dataList: peopleData, dataType: 'people', source: 'Starships'}} />
          </div>
        : <div></div>
      }

      <IconButton id='to-top-button' onClick={scrollToTop}>
        <ExpandLessRoundedIcon/>
      </IconButton>

    </div>
  )
}

export default SingleStarship