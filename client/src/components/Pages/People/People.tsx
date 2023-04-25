import { useEffect, useState } from 'react';
import {FormControl, Grid, InputLabel, MenuItem, Select, SelectChangeEvent} from '@mui/material';
import axios from 'axios';
import GeneralCard from '../../GeneralCard/GeneralCard';

import './People.css';


function People() {
  
    
    
    let [peopleData, setPeopleData] = useState<any[]>([]);
    const [peopleDataOrig, setPeopleDataOrig] = useState<any[]>([]);
    const [sortOption, setSortOption] = useState('default');
    const hostName = 'http://localhost:4000';


    function handleChange(event: SelectChangeEvent) {
        setSortOption(event.target.value as string);
    }

    useEffect(() => {
      // Retrieve data from backend API
      axios.get(hostName + '/people')
      .then((res) => {
          setPeopleData(res.data);
          setPeopleDataOrig(res.data);
         
      });

    }, []);

    useEffect(() => {
        console.log(sortOption);
        //TODO

        if (sortOption == 'default') {
            axios.get(hostName + '/people', {
                params: {
                    sortType: 'Default'
                }
            })
        }
        else {
            axios.get(hostName + '/people', {
                params: {
                    sortType: 'Height'
                }
            })
        }
      
    }, [sortOption]);


    if (peopleData.length === 0) {
        return <div className='loading'>Loading People Data...</div>;
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
                          <MenuItem value={'default'}>Default Order</MenuItem>
                          <MenuItem value={'height'}>Height Order</MenuItem>
                        </Select>
                      </FormControl>
            </div>


            <div className='people-cards-grid'>
              <Grid container rowSpacing={{ xs: 5, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 16 }} >
                  {Array.from(peopleData).map((peopleItem, index) => (
                  <Grid item xs={2} sm={4} md={4} key={peopleItem._id}>
                      <GeneralCard {...{object: peopleItem, imageURL: "https://storage.cloud.google.com/starwars_people_imgs/luke" + "" + ".jpg", type:"people"}} />
                  </Grid>
              ))}
              </Grid>   
            </div>
          </div>
    );
}

export default People;