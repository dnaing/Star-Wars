import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import './FilmCard.css';


interface Props {
    filmObject: any,
    imageURL: string
};

function FilmCard(props: Props) {

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const classList = entry.target.classList;
			if (entry.isIntersecting) { 
				entry.target.classList.add('materialize');
			} 
			else {
				// entry.target.classList.remove('materialize');
			}
		});
		});

		const hiddenElements = document.querySelectorAll('.hidden-2');
		hiddenElements.forEach((element) => observer.observe(element));
	}, []);

	function intToRomanNum(num: number) {
		switch(num) {
			case 1:
				return "I";
			case 2:
				return "II";
			case 3:
				return "III";
			case 4:
				return "IV";
			case 5:
				return "V";
			case 6:
				return "VI";	
		}
	}

	return (
		<>
		<div className='card-container hidden-2'>
			<Link to={`/films/${props.filmObject.episode_id}`} state={ { film: props.filmObject, imageURL: props.imageURL } } style={{ textDecoration: 'none' }}>
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
          alt={props.filmObject.title}
          />
          <CardContent>
            <div className='card-content-film'>
            Episode {intToRomanNum(props.filmObject.episode_id)}: {props.filmObject.title}
            </div>
          </CardContent>

        </CardActionArea>
        </Card>
      </Link>
		</div>

		</>
	)
}

export default FilmCard