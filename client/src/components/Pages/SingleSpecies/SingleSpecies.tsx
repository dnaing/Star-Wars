import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import "./SingleSpecies.css";
import "../../../stylesheets/root.css";
import axios from 'axios';
import Carousel from '../../Carousel/Carousel';
import { CircularProgress } from '@mui/material';

function SingleSpecies() {

  let [homeworldData, setHomeworldData] = useState<any[]>([]);
  let [useLink, setUseLink] = useState(true);
  const location = useLocation();
  const { species, imageURL } = location.state;
  console.log(species);
  const hostName = 'http://localhost:4000';

  let [filmData, setFilmData] = useState<any[]>([]);
  let [peopleData, setPeopleData] = useState<any[]>([]);


  useEffect(() => {
    if (species) {
      axios.get(hostName + '/planets/' + species.homeworld)
      .then((res) => {
          if (res.data.length == 0) {
              setUseLink(false);
              setHomeworldData(["PLACEHOLDER"]);
          }
          else {
              setHomeworldData(res.data);
          }
          
      })
    }
  }, [species]);

  useEffect(() => {
    if (species) {
      axios.get(hostName + '/films/featured', {
        params: {
          data: species.films
        }
      })
      .then((res) => {
          setFilmData(res.data);
      })
    }
  }, [species]);

  useEffect(() => {
    if (species) {
      axios.get(hostName + '/people/featured', {
        params: {
          data: species.people
        }
      })
      .then((res) => {
          setPeopleData(res.data);
      })
    }
  }, [species]);


  if (species == null || homeworldData.length == 0) {
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
        <div className="leftsidespecies">
          <div className="innerleftsidespecies">
            <h1>{species.name}</h1>
            <p>Classification: {species.classification}</p>
            <p>Designation: {species.designation}</p>
            <p>Average Height: {species.average_height} cm</p>
            <p>Average Lifespan: {species.average_lifespan} years</p>
            <p>Hair Colors: {species.hair_colors}</p>
            <p>Skin Colors: {species.skin_colors}</p>
            <p>Eye Colors: {species.eye_colors}</p>
            <p>Language: {species.language}</p>
            <div>
              {useLink
                ? <p>Home World:{' '}
                <Link to={`/planets/${homeworldData.at(0).name.replace(/\s+/g, '')}`} 
                      state={ { planets: homeworldData.at(0), 
                                imageURL: "https://storage.cloud.google.com/starwars_planets_imgs/" + homeworldData.at(0).name.replace(/\s+/g, '') + ".jpg" 
                              } 
                            } style={{ textDecoration: 'none' }}>
                  {species.homeworld}
                </Link>
                </p>
                : <p>Home World: {species.homeworld}</p>
              }
            </div>
          </div>
        </div>

        <div className="rightsidespecies">
          <img id="speciesimg" src={imageURL}></img>
        </div>
      </div>



      {
        filmData.length > 0
        ? <div className="filmNavigation">
            <Carousel {...{dataList: filmData, dataType: 'films', source: 'Species'}} />
          </div>
        : <div></div>
      }

      {
        peopleData.length > 0
        ? <div className="peopleNavigation">
            <Carousel {...{dataList: peopleData, dataType: 'people', source: 'Species'}} />
          </div>
        : <div></div>
      }

    </div>
  )
}

export default SingleSpecies