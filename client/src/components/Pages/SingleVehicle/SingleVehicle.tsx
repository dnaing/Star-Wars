import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './SingleVehicle.css';
import "../../../stylesheets/root.css";
import axios from 'axios';
import Carousel from '../../Carousel/Carousel';
import { CircularProgress } from '@mui/material';
import { IconButton } from '@mui/material';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

function SingleVehicle() {
  const location = useLocation();
  const { vehicles, imageURL } = location.state;
  const hostName = 'http://localhost:4000';

  let [filmData, setFilmData] = useState<any[]>([]);
  let [peopleData, setPeopleData] = useState<any[]>([]);

  function scrollToTop() {
    window.scrollBy({ top: -100000, left: 0, behavior: 'smooth' });
  }

  useEffect(() => {
    if (vehicles) {
      axios.get(hostName + '/films/featured', {
        params: {
          data: vehicles.films
        }
      })
      .then((res) => {
          setFilmData(res.data);
      })
    }
  }, [vehicles]);

  useEffect(() => {
    if (vehicles) {
      axios.get(hostName + '/people/featured', {
        params: {
          data: vehicles.pilots
        }
      })
      .then((res) => {
          setPeopleData(res.data);
      })
    }
  }, [vehicles]);

  if (vehicles == null) {
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
        <div className="leftsidevehicle">
          <div className="innerleftsidevehicle">
            <h1>{vehicles.name}</h1>
            <p>Model: {vehicles.model}</p>
            <p>Manufacturer: {vehicles.manufacturer}</p>
            <p>Vehicle Class: {vehicles.vehicle_class}</p>
            <p>Cost: {vehicles.cost_in_credits} credits</p>
            <p>Length: {vehicles.length} meters</p>
            <p>Max Atmosphering Speed: {vehicles.max_atmosphering_speed} kilometers per hour</p>
            <p>Crew: {vehicles.crew}</p>
            <p>Passengers: {vehicles.passengers}</p>

            {vehicles.cargo_capacity == "none"
            ? <p>Cargo Capacity: 0 kilograms</p>
            : <p>Cargo Capacity: {vehicles.cargo_capacity} kilograms</p>
            }
            
            <p>Consumables: {vehicles.consumables}</p>
          </div>
        </div>

        <div className="rightsidevehicle">
          <img id="vehicleimg" src={imageURL}></img>
        </div>
      </div>


      {
        filmData.length > 0
        ? <div className="filmNavigation">
            <Carousel {...{dataList: filmData, dataType: 'films', source: 'Vehicles'}} />
          </div>
        : <div></div>
      }

      {
        peopleData.length > 0
        ? <div className="peopleNavigation">
            <Carousel {...{dataList: peopleData, dataType: 'people', source: 'Vehicles'}} />
          </div>
        : <div></div>
      }

      <IconButton id='to-top-button' onClick={scrollToTop}>
        <ExpandLessRoundedIcon/>
      </IconButton>

    </div>
  )
}

export default SingleVehicle