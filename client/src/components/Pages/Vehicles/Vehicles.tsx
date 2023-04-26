import { Grid, IconButton } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import GeneralCard from '../../GeneralCard/GeneralCard';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';

import './Vehicles.css';
import '../../../stylesheets/root.css';

function Vehicles() {

    function scrollToTop() {
      window.scrollBy({ top: -100000, left: 0, behavior: 'smooth' });
    }

    let [vehicleData, setVehicleData] = useState<any[]>([]);
    // const [peopleDataOrig, setFilmDataOrig] = useState<any[]>([]);
    // const [sortOption, setSortOption] = useState('chronological');
    const hostName = 'http://localhost:4000';

    useEffect(() => {
      // Retrieve data from backend API
      axios.get(hostName + '/vehicles').then((res) => {
          setVehicleData(res.data)
      });

    }, []);


    if (vehicleData.length === 0) {
        return <div className='loading'>Loading Vehicle Data...</div>;
    }



    return (  
      <div>
        <div className='vehicle-cards-grid'>
          <Grid container rowSpacing={{ xs: 5, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 16 }} >
              {Array.from(vehicleData).map((vehicleItem, index) => (
              <Grid item xs={2} sm={4} md={4} key={vehicleItem._id}>
                  <GeneralCard {...{object: vehicleItem, imageURL: "https://storage.cloud.google.com/starwars_people_imgs/luke" + "" + ".jpg", type:"vehicles"}} />
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

export default Vehicles;