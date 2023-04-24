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
          <Route path='/starships' element={<Starships/>} />
          <Route path='/vehicles' element={<Vehicles/>} />
        </Routes>
      </Router>
    </div> 
    
  );
}

export default App;
