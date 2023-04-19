import React, { useState, useEffect } from 'react';
import {Grid} from '@mui/material';
import axios from 'axios';

import MyCard from '../../MyCard/MyCard';

import './Films.css';

function Films() {

    const [filmData, setFilmData] = useState<any[]>([]);
    const hostName = 'http://localhost:4000';

    useEffect(() => {
        // Retrieve data from backend API
        axios.get(hostName + '/films').then((res) => {
            setFilmData(res.data);
        });

    }, []);

    

    filmData.sort((a,b) => a.episode_id - b.episode_id);

    if (filmData.length === 0) {
        return <div className='loading'>Loading Film Data...</div>;
    }

    return (  
        <div className='film-cards-grid'>

          <Grid container rowSpacing={{ xs: 5, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center" alignItems="center">
            {Array.from(filmData).map((filmItem, index) => (
              <Grid item xs={2} sm={4} md={4} key={filmItem._id}>
                <MyCard {...{imageURL: "https://storage.cloud.google.com/starwars_films_imgs/episode" + filmItem.episode_id + ".jpg", name: filmItem.title}} />
              </Grid>
            ))}
          </Grid>   
        </div>
    );
}

export default Films;