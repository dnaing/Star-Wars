import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import styles from "./SingleFilm.module.css";
import "../../../stylesheets/root.css"
import { CircularProgress, IconButton } from '@mui/material';

import axios from 'axios';

import Carousel from '../../Carousel/Carousel';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import hostName from '../../Variables/variables';

function SingleFilm() {

  console.log(styles);

  const location = useLocation();
  const { film, imageURL } = location.state;


  let [peopleData, setPeopleData] = useState<any[]>([]);
  let [speciesData, setSpeciesData] = useState<any[]>([]);
  let [planetData, setPlanetData] = useState<any[]>([]);
  let [starshipData, setStarshipData] = useState<any[]>([]);
  let [vehicleData, setVehicleData] = useState<any[]>([]);

  function scrollToTop() {
    window.scrollBy({ top: -100000, left: 0, behavior: 'smooth' });
  }

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


  // Get featured species data
  useEffect(() => {
    if (film) {
      axios.get(hostName + '/species/featured', {
        params: {
            data: film.species
        }
      })
      .then((res) => {
          setSpeciesData(res.data);
      })
    }
  }, [film]);  

  // Get featured planet data
  useEffect(() => {
    if (film) {
      axios.get(hostName + '/planets/featured', {
        params: {
            data: film.planets
        }
      })
      .then((res) => {
          setPlanetData(res.data);
      })
    }
  }, [film]); 

  // Get featured starship data
  useEffect(() => {
    if (film) {
      axios.get(hostName + '/starships/featured', {
        params: {
            data: film.starships
        }
      })
      .then((res) => {
          setStarshipData(res.data);
      })
    }
  }, [film]); 

  // Get featured vehicle data
  useEffect(() => {
    if (film) {
      axios.get(hostName + '/vehicles/featured', {
        params: {
            data: film.vehicles
        }
      })
      .then((res) => {
          setVehicleData(res.data);
      })
    }
  }, [film]); 

  if (film == null || 
      peopleData.length === 0 || 
      speciesData.length === 0 || 
      planetData.length === 0 ||
      starshipData.length === 0 ||
      vehicleData.length === 0) {
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

        <h1>{film.title}</h1>

        <div className={styles['screen-info']}>

         
          <div className={styles.leftsidefilm}>
            <p>Directed By: {film.director}</p>
            <p>Produced By: {film.producer}</p>
            <p>Release Date: {film.release_date}</p>
            <p id={styles['opening']}>{film.opening_crawl}</p>
          </div>
      
          <img id={styles['filmimg']} src={imageURL} alt="Star Wars film poster"></img>
         

        </div>

        

      </div>

      {/* Insert routings */}

      <div className="characterNavigation">
        <Carousel {...{dataList: peopleData, dataType: 'people', source: 'Films'}} />
      </div>

      <div className="speciesNavigation">
        <Carousel {...{dataList: speciesData, dataType: 'species', source: 'Films'}} />
      </div>

      <div className="planetNavigation"> 
        <Carousel {...{dataList: planetData, dataType: 'planets', source: 'Films'}} />
      </div>

      <div className="starshipNavigation">
        <Carousel {...{dataList: starshipData, dataType: 'starships', source: 'Films'}} />
      </div>

      <div className="vehicleNavigation">
        <Carousel {...{dataList: vehicleData, dataType: 'vehicles', source: 'Films'}} />
      </div>

      <IconButton id='to-top-button' onClick={scrollToTop}>
        <ExpandLessRoundedIcon/>
      </IconButton>

    </div>
  )
}

export default SingleFilm