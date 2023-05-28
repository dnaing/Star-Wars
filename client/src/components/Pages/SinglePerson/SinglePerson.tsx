import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import "./SinglePerson.css";
import axios from 'axios';
import Carousel from '../../Carousel/Carousel';

function SinglePerson() {

  let [homeworldData, setHomeworldData] = useState<any[]>([]);
  const location = useLocation();
  const { people, imageURL } = location.state;
  const hostName = 'http://localhost:4000';

  let [filmData, setFilmData] = useState<any[]>([]);
  let [speciesData, setSpeciesData] = useState<any[]>([]);
  let [starshipData, setStarshipData] = useState<any[]>([]);
  let [vehicleData, setVehicleData] = useState<any[]>([]);

  useEffect(() => {
    if (people) {
      axios.get(hostName + '/planets/' + people.homeworld)
      .then((res) => {
          setHomeworldData(res.data);
      })
    }
  }, [people]);

  useEffect(() => {
    if (people) {
      axios.get(hostName + '/films/featured', {
        params: {
          data: people.films
        }
      })
      .then((res) => {
          setFilmData(res.data);
      })
    }
  }, [people]);

  useEffect(() => {
    if (people) {
      axios.get(hostName + '/species/featured', {
        params: {
          data: people.species
        }
      })
      .then((res) => {
          setSpeciesData(res.data);
      })
    }
  }, [people]);

  useEffect(() => {
    if (people) {
      axios.get(hostName + '/starships/featured', {
        params: {
          data: people.starships
        }
      })
      .then((res) => {
          setStarshipData(res.data);
      })
    }
  }, [people]);

  useEffect(() => {
    if (people) {
      axios.get(hostName + '/vehicles/featured', {
        params: {
          data: people.vehicles
        }
      })
      .then((res) => {
          setVehicleData(res.data);
      })
    }
  }, [people]);

  if (people == null || homeworldData.length == 0) {
    return (
      <div>
        LOADING
      </div>
    )
  }

  // console.log(homeworldData);

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



      
      
      {
        filmData.length > 0
        ? <div className="filmNavigation">
            <Carousel {...{dataList: filmData, dataType: 'films', source: 'People'}} />
          </div>
        : <div></div>
      }

      {
        speciesData.length > 0
        ? <div className="speciesNavigation">
            <Carousel {...{dataList: speciesData, dataType: 'species', source: 'People'}} />
          </div>
        : <div></div>
      }
      
      {
        starshipData.length > 0
        ? <div className="starshipNavigation"> 
            <Carousel {...{dataList: starshipData, dataType: 'starships', source: 'People'}} />
          </div>
        : <div></div>
      }
      
      {
        vehicleData.length > 0
        ? <div className="vehicleNavigation">
            <Carousel {...{dataList: vehicleData, dataType: 'vehicles', source: 'People'}} />
          </div>
        : <div></div>
      }
      
    </div>
  )
}

export default SinglePerson