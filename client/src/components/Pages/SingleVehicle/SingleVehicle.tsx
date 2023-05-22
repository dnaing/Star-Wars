import React from 'react';
import { useLocation } from 'react-router-dom';

import './SingleVehicle.css';

function SingleVehicle() {
  const location = useLocation();
  const { vehicles, imageURL } = location.state;

  if (vehicles == null) {
    return (
      <div>
        LOADING
      </div>
    )
  }

  return (
    <div>
      
      <div className="screen">
        <div className="leftsidevehicle">
          <div className="innerleftsidevehicle">
            <h1>{vehicles.name}</h1>
            <p>Model: {vehicles.name}</p>
            <p>Manufacturer: {vehicles.manufacturer}</p>
            <p>Vehicle Class: {vehicles.vehicle_class}</p>
            <p>Cost: {vehicles.cost_in_credits} credits</p>
            <p>Length: {vehicles.length} meters</p>
            <p>Max Atmosphering Speed: {vehicles.max_atmosphering_speed}</p>
            <p>Crew: {vehicles.crew}</p>
            <p>Passengers: {vehicles.passengers}</p>
            <p>Cargo Capacity: {vehicles.cargo_capacity} kilograms</p>
            <p>Consumables: {vehicles.consumables}</p>
          </div>
        </div>

        <div className="rightsidevehicle">
          <img id="vehicleimg" src={imageURL}></img>
        </div>
      </div>

    </div>
  )
}

export default SingleVehicle