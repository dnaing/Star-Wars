import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import styles from "./SingleSpecies.module.css";
import "../../../stylesheets/root.css";
import axios from 'axios';
import Carousel from '../../Carousel/Carousel';
import { CircularProgress } from '@mui/material';
import { IconButton } from '@mui/material';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import hostName from '../../Variables/variables';

function SingleSpecies() {

  let [homeworldData, setHomeworldData] = useState<any[]>([]);
  let [useLink, setUseLink] = useState(true);
  const location = useLocation();
  const { species, imageURL } = location.state;

  let [filmData, setFilmData] = useState<any[]>([]);
  let [peopleData, setPeopleData] = useState<any[]>([]);

  function scrollToTop() {
    window.scrollBy({ top: -100000, left: 0, behavior: 'smooth' });
  }


  useEffect(() => {
    if (species) {
      axios.get(hostName + '/planets/' + species.homeworld)
      .then((res) => {
          if (res.data.length === 0) {
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


  if (species === null || homeworldData.length === 0) {
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

        <h1>{species.name}</h1>



        <div className={styles['screen-info']}>

          <div className={styles.leftsidespecies}>
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

          <img id={styles.speciesimg} src={imageURL} alt="Visual of the species"></img>

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

      <IconButton id='to-top-button' onClick={scrollToTop}>
        <ExpandLessRoundedIcon/>
      </IconButton>

    </div>
  )
}

export default SingleSpecies