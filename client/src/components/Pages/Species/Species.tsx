import { CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import GeneralCard from '../../GeneralCard/GeneralCard';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import hostName from '../../Variables/variables';

import './Species.css';
import '../../../stylesheets/root.css';

function Species() {

    function scrollToTop() {
      window.scrollBy({ top: -100000, left: 0, behavior: 'smooth' });
    }

    function handleChange(event: SelectChangeEvent) {
      setSortOption(event.target.value as string);
    }

    function handleOrdering(event: SelectChangeEvent) {
        setSortOrdering(event.target.value as string);
    }

    let [speciesData, setSpeciesData] = useState<any[]>([]);
    const [sortOption, setSortOption] = useState('alpha');
    const [sortOrdering, setSortOrdering] = useState('ascending');

    useEffect(() => {

      if (sortOption === 'alpha') {
          axios.get(hostName + '/species', {
              params: {
                  sortType: 'Alpha',
                  sortOrdering: sortOrdering
              }
          })
          .then((res) => {
              setSpeciesData(res.data);
          })
      }
      else if (sortOption === 'height') {
          axios.get(hostName + '/species', {
              params: {
                  sortType: 'Height',
                  sortOrdering: sortOrdering
              }
          })
          .then((res) => {
              setSpeciesData(res.data);
          })
      }
      else if (sortOption === 'lifespan') {
          axios.get(hostName + '/species', {
              params: {
                  sortType: 'Lifespan',
                  sortOrdering: sortOrdering
              }
          })
          .then((res) => {
              setSpeciesData(res.data);
          })            
      }
    
    }, [sortOption, sortOrdering]);


    if (speciesData.length === 0) {
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
                        <MenuItem value={'height'}>Average Height</MenuItem>
                          <MenuItem value={'lifespan'}>Average Lifespan</MenuItem>
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



          <div className='species-cards-grid'>
            <Grid container rowSpacing={{ xs: 2.5, sm: 2.5, md: 5 }} columnSpacing={{ xs: 1, sm: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 20 }} >
                {Array.from(speciesData).map((speciesItem, index) => (
                <Grid item xs={2} sm={4} md={4} key={speciesItem._id}>
                    <GeneralCard {...{object: speciesItem, imageURL: "https://storage.googleapis.com/starwars_species_imgs/" + speciesItem.name.replace(/\s+/g, '') + ".jpg", type:"species"}} />
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

export default Species;