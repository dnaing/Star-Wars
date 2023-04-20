import React, { useState, useEffect } from 'react';
import {FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import axios from 'axios';
import Button from '@mui/material/Button';

import MyCard from '../../MyCard/MyCard';

import './Films.css';

function Films() {

    const [filmData, setFilmData] = useState<any[]>([]);
    const [sortOption, setSortOption] = useState('');
    const hostName = 'http://localhost:4000';

    useEffect(() => {
        // Retrieve data from backend API
        axios.get(hostName + '/films').then((res) => {
            setFilmData(res.data);
        });

    }, []);

    function handleChange(event: SelectChangeEvent) {
		setSortOption(event.target.value as string);
	}
	
	
	filmData.sort((a,b) => a.episode_id - b.episode_id);
	if (filmData.length === 0) {
        return <div className='loading'>Loading Film Data...</div>;
    }

    return (  

      <div>

        <div className='sort-options'>
          <FormControl fullWidth variant="filled">
            <InputLabel id="demo-simple-select-label"><p style={{color:'white'}}>Order By:</p></InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={sortOption}
              label="Sort By:"
              onChange={handleChange}
			  style={{color: 'white', backgroundColor: 'gray'}}
            >
              <MenuItem value={'chronological'}>Chronological Order</MenuItem>
              <MenuItem value={'release'}>Release Order</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div className='film-cards-grid'>
          <Grid container rowSpacing={{ xs: 5, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 12 }} justifyContent="center" alignItems="center">
            {Array.from(filmData).map((filmItem, index) => (
              <Grid item xs={2} sm={4} md={4} key={filmItem._id}>
                <MyCard {...{filmObject: filmItem, imageURL: "https://storage.cloud.google.com/starwars_films_imgs/episode" + filmItem.episode_id + ".jpg"}} />
              </Grid>
            ))}
          </Grid>   
        </div>
      </div>

    );
}

export default Films;