import { Grid } from '@mui/material';
import './People.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import PeopleCard from '../../PeopleCard/PeopleCard';


function People() {
    
    let [peopleData, setPeopleData] = useState<any[]>([]);
    // const [peopleDataOrig, setFilmDataOrig] = useState<any[]>([]);
    // const [sortOption, setSortOption] = useState('chronological');
    const hostName = 'http://localhost:4000';

    useEffect(() => {
      // Retrieve data from backend API
      axios.get(hostName + '/people').then((res) => {
          setPeopleData(res.data)
          console.log(peopleData);
      });

    }, []);


    if (peopleData.length === 0) {
        return <div className='loading'>Loading People Data...</div>;
    }
    return (  
          <div>
            <div className='people-cards-grid'>
              <Grid container rowSpacing={{ xs: 5, sm: 5, md: 10 }} columnSpacing={{ xs: 1, sm: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 16 }} justifyContent="center" alignItems="center">
                  {Array.from(peopleData).map((peopleItem, index) => (
                  <Grid item xs={2} sm={4} md={4} key={peopleItem._id}>
                      <PeopleCard {...{object: peopleItem, imageURL: "https://storage.cloud.google.com/starwars_people_imgs/luke" + "" + ".jpg"}} />
                  </Grid>
              ))}
              </Grid>   
            </div>
          </div>
    );
}

export default People;