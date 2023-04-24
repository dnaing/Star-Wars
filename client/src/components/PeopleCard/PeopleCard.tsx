import React, { useEffect } from 'react';
import './PeopleCard.css';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { CardActionArea, CardContent, CardMedia } from '@mui/material';

interface Props {
    object: any;
    imageURL: string;
}


function PeopleCard(props: Props) {

  useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const classList = entry.target.classList;
			if (entry.isIntersecting) { 
				entry.target.classList.add('materialize');
			} 
			else {
				entry.target.classList.remove('materialize');
			}
		});
		});

		const hiddenElements = document.querySelectorAll('.hidden-2');
		hiddenElements.forEach((element) => observer.observe(element));
	}, []);



  return (
		<>
      <div className='card-container hidden-2'>
        <Link to={`/people/${props.object.name}`} state={ { film: props.object, imageURL: props.imageURL } }>
          <Card style={{ maxWidth: "60%", maxHeight: "100%", margin: "auto" }}>
          
          <CardActionArea>
            <CardMedia
            component="img"
            image={props.imageURL}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: 'cover'
            }}
            alt={props.object.name}
            />
            <CardContent>
              <div className='card-content'>
              {props.object.name}
              </div>
            </CardContent>

          </CardActionArea>
          </Card>
        </Link>
      </div>

		</>
  )
}

export default PeopleCard