import React, { useEffect, useState } from 'react'
import GeneralCard from '../GeneralCard/GeneralCard';
import { Button } from 'react-bootstrap';
import { CircularProgress, Grid } from '@mui/material';

import './Carousel.css';
import FilmCard from '../FilmCard/FilmCard';

interface Props {
    dataList: any;
    dataType: string;
    source: string;
}

// This component takes in a list of data like characters or starships
// We will loop through this data displaying general cards
function Carousel(props: Props) {

    let [currentPage, setCurrentPage] = useState(0);
    let [shownItems, setShownItems] = useState<any[]>([]);
    let [prevDisabled, setPrevDisabled] = useState(true);
    let [nextDisabled, setNextDisabled] = useState(false);
    let carouselTitle;
    
    const itemsPerPage = 5;
    const lastPage = Math.ceil(props.dataList.length / itemsPerPage);
    
    useEffect(() => {

        //Set button disabling here
        if (currentPage == lastPage - 1) {
            setNextDisabled(true);
        }
        else {
            setNextDisabled(false);
        }
        if (currentPage == 0) {
            setPrevDisabled(true);
        }
        else {
            setPrevDisabled(false);
        }

        let startIndex = currentPage * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
        setShownItems(props.dataList.slice(startIndex, endIndex));
        // console.log(shownItems);
    }, [currentPage]);

    useEffect(() => {
        // console.log(shownItems);
    }, [shownItems]);

    function toNextPage() {
        if (currentPage == lastPage - 1) {
            alert("cannot go next");
        }
        else {
            setCurrentPage((curPage) => curPage + 1);
        }  
    }

    function toPrevPage() {
        if (currentPage == 0) {
            alert("cannot go back")
        }
        else {
            setCurrentPage((curPage) => curPage - 1);
        } 
    }

    
    if (props.source == 'Films') {
        if (props.dataType == 'people') {
            carouselTitle = <h1 className='carouselTitle'>Featured Characters</h1>
        } else if (props.dataType == 'species') {
            carouselTitle = <h1 className='carouselTitle'>Featured Species</h1>
        } else if (props.dataType == 'planets') {
            carouselTitle = <h1 className='carouselTitle'>Featured Planets</h1>
        } else if (props.dataType == 'starships') {
            carouselTitle = <h1 className='carouselTitle'>Featured Starships</h1>
        } else if (props.dataType == 'vehicles') {
            carouselTitle = <h1 className='carouselTitle'>Featured Vehicles</h1>
        } else if (props.dataType == 'films') {
            carouselTitle = <h1 className='carouselTitle'>Featured Films</h1>
        }
    }

    else if (props.source == 'People') {
        if (props.dataType == 'films') {
            carouselTitle = <h1 className='carouselTitle'>Featured in these Films</h1>
        } else if (props.dataType == 'species') {
            carouselTitle = <h1 className='carouselTitle'>Part of these Species</h1>
        } else if (props.dataType == 'starships') {
            carouselTitle = <h1 className='carouselTitle'>Piloted Starships</h1>
        } else if (props.dataType == 'vehicles') {
            carouselTitle = <h1 className='carouselTitle'>Piloted Vehicles</h1>
        }       
    }

    else if (props.source == 'Species') {
        if (props.dataType == 'films') {
            carouselTitle = <h1 className='carouselTitle'>Featured in these Films</h1>
        } else if (props.dataType == 'people') {
            carouselTitle = <h1 className='carouselTitle'>Featured People</h1>
        }
    }

    else if (props.source == 'Planets') {
        if (props.dataType == 'films') {
            carouselTitle = <h1 className='carouselTitle'>Featured in these Films</h1>
        } else if (props.dataType == 'people') {
            carouselTitle = <h1 className='carouselTitle'>Residents</h1>
        }
    }

    else if (props.source == 'Starships' || props.source == 'Vehicles') {
        if (props.dataType == 'films') {
            carouselTitle = <h1 className='carouselTitle'>Featured in these Films</h1>
        } else if (props.dataType == 'people') {
            carouselTitle = <h1 className='carouselTitle'>Pilots</h1>
        }
    }


    
  
    if (shownItems.length === 0) {
        return (
            <div>
                <CircularProgress size="5rem"/>
            </div>
        )
    }

  return (
    <div>
        <div className='carouselModal'>

            {carouselTitle}

            <div className='carouselItems'>
                {
                    props.dataType != "films"
                    ? <Grid container rowSpacing={{ xs: 2.5, sm: 2.5, md: 5 }} columnSpacing={{ xs: 1, sm: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 20 }} >
                        {shownItems.map((theItem, index) => (
                          <Grid item xs={2} sm={4} md={4} key={theItem._id}>
                            <GeneralCard {...{object: theItem, imageURL: "https://storage.cloud.google.com/starwars_" + props.dataType + "_imgs/" + theItem.name.replace(/[ /]+/g, '') + ".jpg", type: props.dataType}} />
                          </Grid>
                        ))}
                      </Grid>

                    : <Grid container rowSpacing={{ xs: 2.5, sm: 2.5, md: 5 }} columnSpacing={{ xs: 1, sm: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 20 }} >
                        {shownItems.map((theItem, index) => (
                          <Grid item xs={2} sm={4} md={4} key={theItem._id}>
                            <FilmCard {...{filmObject: theItem, imageURL: "https://storage.cloud.google.com/starwars_films_imgs/episode" + theItem.episode_id + ".jpg"}} />
                          </Grid>
                        ))}
                      </Grid>
                }
                
            </div>

            <div className='carouselButtons'>
                <Button className='button' onClick={() => toPrevPage()} disabled={prevDisabled}>Prev</Button>
                <div className='carouselPageNumBackground'>
                    <p>{currentPage + 1}</p>
                </div>
                <Button className='button' onClick={() => toNextPage()} disabled={nextDisabled}>Next</Button>
            </div>
        </div>

    </div>
  )
}

export default Carousel