import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import GeneralCard from '../../GeneralCard/GeneralCard';

import './Planets.css';


function Planets() {


    let [planetData, setPlanetData] = useState<any[]>([]);
    // const [peopleDataOrig, setFilmDataOrig] = useState<any[]>([]);
    // const [sortOption, setSortOption] = useState('chronological');
    const hostName = 'http://localhost:4000';

    useEffect(() => {
      // Retrieve data from backend API
      axios.get(hostName + '/planets').then((res) => {
          setPlanetData(res.data)
      });

    }, []);


    if (planetData.length === 0) {
        return <div className='loading'>Loading Planet Data...</div>;
    }

    return (  
      <div>
        <div className='planet-cards-grid'>
          <Grid container rowSpacing={{ xs: 5, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 16 }} >
              {Array.from(planetData).map((planetItem, index) => (
              <Grid item xs={2} sm={4} md={4} key={planetItem._id}>
                  <GeneralCard {...{object: planetItem, imageURL: "https://storage.cloud.google.com/starwars_people_imgs/luke" + "" + ".jpg", type:"planets"}} />
              </Grid>
          ))}
          </Grid>   
        </div>
      </div>        
  );
}

export default Planets;