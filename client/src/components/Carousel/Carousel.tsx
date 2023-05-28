import React, { useEffect, useState } from 'react'
import GeneralCard from '../GeneralCard/GeneralCard';
import { Button } from 'react-bootstrap';
import { Grid } from '@mui/material';

import './Carousel.css';

interface Props {
    dataList: any;
}

// This component takes in a list of data like characters or starships
// We will loop through this data displaying general cards
function Carousel(props: Props) {

    let [currentPage, setCurrentPage] = useState(0);
    let [shownItems, setShownItems] = useState<any[]>([]);
    let [prevDisabled, setPrevDisabled] = useState(true);
    let [nextDisabled, setNextDisabled] = useState(false);
    
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
        console.log(shownItems);
    }, [currentPage]);

    useEffect(() => {
        console.log(shownItems);
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

    console.log(props.dataList);
    

  if (shownItems.length === 0) {
    return (
        <div>
            LOADING CAROUSEL ITEMS
        </div>
    )
  }

  return (
    <div>
        <div className='carouselModal'>

            <h1 className='carouselTitle'>Featured Characters</h1>

            <div className='carouselItems'>
                <Grid container rowSpacing={{ xs: 2.5, sm: 2.5, md: 5 }} columnSpacing={{ xs: 1, sm: 1, md: 1 }} columns={{ xs: 4, sm: 8, md: 20 }} >
                {shownItems.map((peopleItem, index) => (
                    <Grid item xs={2} sm={4} md={4} key={peopleItem._id}>
                    <GeneralCard {...{object: peopleItem, imageURL: "https://storage.cloud.google.com/starwars_people_imgs/" + peopleItem.name.replace(/\s+/g, '') + ".jpg", type:"people"}} />
                    </Grid>
                ))}
                </Grid> 
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