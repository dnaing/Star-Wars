import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
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

    if (filmData.length == 0) {
        return <div className='loading'>Loading Film Data...</div>;
    }
    const myProps: Props = { imageURL: "https://storage.cloud.google.com/starwars_films_imgs/episode1.jpg", name: "The Phantom Menace" };
    return (  
        <>
          {/* <div>
            <img src={imageURL} alt="My Image" />
          </div>
          <div>
          {filmData.map((item) => (
              <div className='loading' key={item._id}>
                <h2>{item.title}</h2>
                <p>{item.opening_crawl}</p>
              </div>
          ))}
          </div> */}

          <MyCard {...myProps} /> 
        </>
    );
}

export default Films;