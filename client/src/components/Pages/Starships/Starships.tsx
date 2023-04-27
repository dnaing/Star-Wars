import { FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
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
    
    function handleChange(event: SelectChangeEvent) {
      setSortOption(event.target.value as string);
    }

    function handleOrdering(event: SelectChangeEvent) {
        setSortOrdering(event.target.value as string);
    }

    let [starshipData, setStarshipData] = useState<any[]>([]);
    const [sortOption, setSortOption] = useState('alpha');
    const [sortOrdering, setSortOrdering] = useState('ascending');
    const hostName = 'http://localhost:4000';

    // useEffect(() => {
    //   // Retrieve data from backend API
    //   axios.get(hostName + '/starships').then((res) => {
    //       setStarshipData(res.data)
    //   });

    // }, []);

    useEffect(() => {

      if (sortOption == 'alpha') {
          axios.get(hostName + '/starships', {
              params: {
                  sortType: 'Alpha',
                  sortOrdering: sortOrdering
              }
          })
          .then((res) => {
              setStarshipData(res.data);
          })
      }
      // else if (sortOption == 'height') {
      //     axios.get(hostName + '/people', {
      //         params: {
      //             sortType: 'Height',
      //             sortOrdering: sortOrdering
      //         }
      //     })
      //     .then((res) => {
      //         setPeopleData(res.data);
      //     })
      // }
      // else if (sortOption == 'mass') {
      //     axios.get(hostName + '/people', {
      //         params: {
      //             sortType: 'Mass',
      //             sortOrdering: sortOrdering
      //         }
      //     })
      //     .then((res) => {
      //         setPeopleData(res.data);
      //     })            
      // }
    
    }, [sortOption, sortOrdering]);


    if (starshipData.length === 0) {
        return <div className='loading'>Loading Starship Data...</div>;
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