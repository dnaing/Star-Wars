import { CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import GeneralCard from '../../GeneralCard/GeneralCard';
import ExpandLessRoundedIcon from '@mui/icons-material/ExpandLessRounded';
import hostName from '../../Variables/variables';

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
      else if (sortOption == 'cost') {
          axios.get(hostName + '/starships', {
              params: {
                  sortType: 'Cost',
                  sortOrdering: sortOrdering
              }
          })
          .then((res) => {
              setStarshipData(res.data);
          })
      }
      else if (sortOption == 'atmosphere') {
        axios.get(hostName + '/starships', {
            params: {
                sortType: 'Atmosphere',
                sortOrdering: sortOrdering
            }
        })
        .then((res) => {
            setStarshipData(res.data);
        })
      }
      else if (sortOption == 'space') {
        axios.get(hostName + '/starships', {
            params: {
                sortType: 'Space',
                sortOrdering: sortOrdering
            }
        })
        .then((res) => {
            setStarshipData(res.data);
        })
      }
      else if (sortOption == 'length') {
        axios.get(hostName + '/starships', {
            params: {
                sortType: 'Length',
                sortOrdering: sortOrdering
            }
        })
        .then((res) => {
            setStarshipData(res.data);
        })
      }
      else if (sortOption == 'crew') {
        axios.get(hostName + '/starships', {
            params: {
                sortType: 'Crew',
                sortOrdering: sortOrdering
            }
        })
        .then((res) => {
            setStarshipData(res.data);
        })
      }
      else if (sortOption == 'passenger') {
        axios.get(hostName + '/starships', {
            params: {
                sortType: 'Passenger',
                sortOrdering: sortOrdering
            }
        })
        .then((res) => {
            setStarshipData(res.data);
        })
      }
      else if (sortOption == 'cargo') {
        axios.get(hostName + '/starships', {
            params: {
                sortType: 'Cargo',
                sortOrdering: sortOrdering
            }
        })
        .then((res) => {
            setStarshipData(res.data);
        })
      }

    
    }, [sortOption, sortOrdering]);


    if (starshipData.length === 0) {
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
                      <MenuItem value={'cost'}>Cost</MenuItem>
                      <MenuItem value={'atmosphere'}>Atmosphering Speed</MenuItem>
                      <MenuItem value={'space'}>Space Travel Speed</MenuItem>
                      <MenuItem value={'length'}>Length</MenuItem>
                      <MenuItem value={'crew'}>Crew Count</MenuItem>
                      <MenuItem value={'passenger'}>Passenger Count</MenuItem>
                      <MenuItem value={'cargo'}>Cargo Capacity</MenuItem>

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
          <Grid container rowSpacing={{ xs: 2.5, sm: 2.5, md: 5 }} columnSpacing={{ xs: 1, sm: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 16 }} >
              {Array.from(starshipData).map((starshipItem, index) => (
              <Grid item xs={2} sm={4} md={4} key={starshipItem._id}>
                  <GeneralCard {...{object: starshipItem, imageURL: "https://storage.googleapis.com/starwars_starships_imgs/" + starshipItem.name.replace(/\s+/g, '') + ".jpg", type:"starships"}} />
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