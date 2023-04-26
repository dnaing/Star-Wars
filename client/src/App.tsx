import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Pages/Home/Home";
import Films from './components/Pages/Films/Films';
import People from './components/Pages/People/People';
import Species from './components/Pages/Species/Species';
import Planets from './components/Pages/Planets/Planets';
import Starships from './components/Pages/Starships/Starships';
import Vehicles from './components/Pages/Vehicles/Vehicles';

import SingleFilm from './components/Pages/SingleFilm/SingleFilm';
import SinglePerson from './components/Pages/SinglePerson/SinglePerson';
import SingleSpecies from './components/Pages/SingleSpecies/SingleSpecies';
import SinglePlanet from './components/Pages/SinglePlanet/SinglePlanet';
import SingleStarship from './components/Pages/SingleStarship/SingleStarship';
import SingleVehicle from './components/Pages/SingleVehicle/SingleVehicle';

import MyFooter from './components/MyFooter/MyFooter';

import './App.css';



import "./fonts/Starjedi.ttf";
import "./fonts/Starjhol.ttf";
import "./fonts/FranklinGothic.otf";

function App() {
  return (
    <div>
      <Router>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/films' element={<Films/>} />
          <Route path='/films/:id' element={<SingleFilm/>} />
          <Route path='/people' element={<People/>} />
          <Route path='/people/:id' element={<SinglePerson/>} />
          <Route path='/species' element={<Species/>} />
          <Route path='/species/:id' element={<SingleSpecies/>} />
          <Route path='/planets' element={<Planets/>} />
          <Route path='/planets/:id' element={<SinglePlanet/>} />
          <Route path='/starships' element={<Starships/>} />
          <Route path='/starships/:id' element={<SingleStarship/>} />
          <Route path='/vehicles' element={<Vehicles/>} />
          <Route path='/vehicles/:id' element={<SingleVehicle/>} />
        </Routes>
      </Router>
      <MyFooter/>
    </div> 
    
  );
}

export default App;
