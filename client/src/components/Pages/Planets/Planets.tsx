import { CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import GeneralCard from '../../GeneralCard/GeneralCard';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import hostName from '../../Variables/variables';

import './Planets.css';
import '../../../stylesheets/root.css';


function Planets() {

    function scrollToTop() {
      window.scrollBy({ top: -100000, left: 0, behavior: 'smooth' });
    }

    function handleChange(event: SelectChangeEvent) {
        setSortOption(event.target.value as string);
    }

    function handleOrdering(event: SelectChangeEvent) {
        setSortOrdering(event.target.value as string);
    }

    let [planetData, setPlanetData] = useState<any[]>([]);
    const [sortOption, setSortOption] = useState('alpha');
    const [sortOrdering, setSortOrdering] = useState('ascending');


    useEffect(() => {

      if (sortOption === 'alpha') {
          axios.get(hostName + '/planets', {
              params: {
                  sortType: 'Alpha',
                  sortOrdering: sortOrdering
              }
          })
          .then((res) => {
              setPlanetData(res.data);
          })
      }
      else if (sortOption === 'population') {
          axios.get(hostName + '/planets', {
              params: {
                  sortType: 'Population',
                  sortOrdering: sortOrdering
              }
          })
          .then((res) => {
              setPlanetData(res.data);
          })
      }
      else if (sortOption === 'size') {
          axios.get(hostName + '/planets', {
              params: {
                  sortType: 'Size',
                  sortOrdering: sortOrdering
              }
          })
          .then((res) => {
              setPlanetData(res.data);
          })            
      }
      else if (sortOption === 'rotation') {
        axios.get(hostName + '/planets', {
            params: {
                sortType: 'Rotation',
                sortOrdering: sortOrdering
            }
        })
        .then((res) => {
            setPlanetData(res.data);
        })            
      }
      else if (sortOption === 'orbital') {
        axios.get(hostName + '/planets', {
            params: {
                sortType: 'Orbital',
                sortOrdering: sortOrdering
            }
        })
        .then((res) => {
            setPlanetData(res.data);
        })            
      }
    
    }, [sortOption, sortOrdering]);

    if (planetData.length === 0) {
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

        <div className='sort-options-container'>
          <div className='sort-options-1'>
                  <FormControl fullWidth variant="filled">
                      <InputLabel id="label"><p style={{color:'white'}}>Sort By:</p></InputLabel>
                      <Select
                      labelId="label"
                      id="select"
                      value={sortOption}
                      label="Sort By:"
                      onChange={handleChange}
                      style={{color: 'white', backgroundColor: 'gray'}}
                      >
                      <MenuItem value={'alpha'}>Alphabetical</MenuItem>
                      <MenuItem value={'population'}>Population</MenuItem>
                      <MenuItem value={'size'}>Size</MenuItem>
                      <MenuItem value={'rotation'}>Rotation Period</MenuItem>
                      <MenuItem value={'orbital'}>Orbital Period</MenuItem>

                      </Select>
                  </FormControl>
          </div>

          <div className='sort-options-2'>
                  <FormControl fullWidth variant="filled">
                      <InputLabel id="label"><p style={{color:'white'}}>Order By:</p></InputLabel>
                      <Select
                      labelId="label"
                      id="select"
                      value={sortOrdering}
                      label="Order By:"
                      onChange={handleOrdering}
                      style={{color: 'white', backgroundColor: 'gray'}}
                      >
                      <MenuItem value={'ascending'}>Increasing</MenuItem>
                      <MenuItem value={'descending'}>Decreasing</MenuItem>
                      </Select>
                  </FormControl>
          </div>
        </div>



        <div className='planet-cards-grid'>
          <Grid container rowSpacing={{ xs: 2.5, sm: 2.5, md: 5 }} columnSpacing={{ xs: 1, sm: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 20 }} >
              {Array.from(planetData).map((planetItem, index) => (
              <Grid item xs={2} sm={4} md={4} key={planetItem._id}>
                  <GeneralCard {...{object: planetItem, imageURL: "https://storage.googleapis.com/starwars_planets_imgs/" + planetItem.name.replace(/\s+/g, '') + ".jpg", type:"planets"}} />
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

export default Planets;