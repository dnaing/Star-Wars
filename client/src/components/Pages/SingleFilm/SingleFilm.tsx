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
  let [speciesData, setSpeciesData] = useState<any[]>([]);
  let [planetData, setPlanetData] = useState<any[]>([]);
  let [starshipData, setStarshipData] = useState<any[]>([]);
  let [vehicleData, setVehicleData] = useState<any[]>([]);

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
      peopleData.length == 0 || 
      speciesData.length == 0 || 
      planetData.length == 0 ||
      starshipData.length == 0 ||
      vehicleData.length == 0) {
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

    </div>
  )
}

export default SingleFilm