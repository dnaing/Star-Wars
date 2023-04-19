import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {Grid} from '@mui/material';
import axios from 'axios';

import MyCard from '../../MyCard/MyCard';

import './Films.css';

interface Props {
    imageURL: string;
    name: string;
}

function Films() {

    const [filmData, setFilmData] = useState<any[]>([]);
    // const [image, setImage] = useState("");
    // const location = useLocation();
    const hostName = 'http://localhost:4000';
    const imageURL = "https://storage.cloud.google.com/starwars_films_imgs/episode1.jpg";

    useEffect(() => {
        // Retrieve data from backend API
        axios.get(hostName + '/films').then((res) => {
            // console.log(res);
            setFilmData(res.data);
        });

    }, []);

    // useEffect(() => {
    //     setImage(imageURL);
    // }, []);

    filmData.sort((a,b) => a.episode_id - b.episode_id);

    if (filmData.length == 0) {
        return <div className='loading'>Loading Film Data...</div>;
    }
    const myProps: Props = { imageURL: "https://storage.cloud.google.com/starwars_films_imgs/episode1.jpg", name: "The Phantom Menace" };
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

// <MyCard {...{imageURL: "https://storage.cloud.google.com/starwars_films_imgs/episode1.jpg", name: "The Phantom Menace"}} />