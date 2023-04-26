import { Grid, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import GeneralCard from '../../GeneralCard/GeneralCard';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

import './Starships.css';
import '../../../stylesheets/root.css';

function Starships() {

    function scrollToTop() {
      window.scrollBy({ top: -100000, left: 0, behavior: 'smooth' });
    }

    let [starshipData, setStarshipData] = useState<any[]>([]);
    // const [peopleDataOrig, setFilmDataOrig] = useState<any[]>([]);
    // const [sortOption, setSortOption] = useState('chronological');
    const hostName = 'http://localhost:4000';

    useEffect(() => {
      // Retrieve data from backend API
      axios.get(hostName + '/starships').then((res) => {
          setStarshipData(res.data)
      });

    }, []);


    if (starshipData.length === 0) {
        return <div className='loading'>Loading Starship Data...</div>;
    }


    return (  
      <div>
        <div className='starship-cards-grid'>
          <Grid container rowSpacing={{ xs: 5, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 16 }} >
              {Array.from(starshipData).map((starshipItem, index) => (
              <Grid item xs={2} sm={4} md={4} key={starshipItem._id}>
                  <GeneralCard {...{object: starshipItem, imageURL: "https://storage.cloud.google.com/starwars_people_imgs/luke" + "" + ".jpg", type:"starships"}} />
              </Grid>
          ))}
          </Grid>   
        </div>

        <IconButton id='to-top-button' onClick={scrollToTop}>
              <ExpandLessRoundedIcon/>
        </IconButton>
        
      </div>        
  );
}

export default Starships;