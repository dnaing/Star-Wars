import React, { useState, useEffect } from 'react';
import {FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import axios from 'axios';
import Button from '@mui/material/Button';

import FilmCard from '../../FilmCard/FilmCard';

import './Films.css';
import '../../../stylesheets/root.css';

function Films() {

    function handleChange(event: SelectChangeEvent) {
        setSortOption(event.target.value as string);
	  }

    function scrollToTop() {
      window.scrollBy({ top: -100000, left: 0, behavior: 'smooth' });
    }

    let [filmData, setFilmData] = useState<any[]>([]);
    const [filmDataOrig, setFilmDataOrig] = useState<any[]>([]);
    const [sortOption, setSortOption] = useState('chronological');
    const hostName = 'http://localhost:4000';

    
    useEffect(() => {
        // Retrieve data from backend API
        axios.get(hostName + '/films').then((res) => {
            setFilmDataOrig(res.data);
            setFilmData(res.data.slice().sort((a: any, b: any) => a.episode_id - b.episode_id));
        });

    }, []);

    useEffect(() => {
        if (sortOption === "chronological") {
            const sortedData = [...filmDataOrig].sort((a, b) => a.episode_id - b.episode_id);
            setFilmData(sortedData);
        } else {
            setFilmData(filmDataOrig);
        }
    }, [sortOption]);
	
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
                <FilmCard {...{filmObject: filmItem, imageURL: "https://storage.cloud.google.com/starwars_films_imgs/episode" + filmItem.episode_id + ".jpg"}} />
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

export default Films;