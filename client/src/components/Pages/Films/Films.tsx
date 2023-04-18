import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

import './Films.css';


function Films() {

    const [filmData, setFilmData] = useState<any[]>([]);
    // const location = useLocation();
    const hostName = 'http://localhost:4000';

    useEffect(() => {
        // Retrieve data from backend API
        axios.get(hostName + '/films').then((res) => {
            // console.log(res);
            setFilmData(res.data);
        });

    }, []);

    if (filmData.length == 0) {
        return <div className='loading'>Loading Film Data...</div>;
    }

    return (  
        <>
          <div>
          {filmData.map((item) => (
              <div className='loading' key={item._id}>
                <h2>{item.title}</h2>
                <p>{item.opening_crawl}</p>
              </div>
          ))}
          </div>
        </>
    );
}

export default Films;