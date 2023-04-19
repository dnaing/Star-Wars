import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './MyCard.css';

interface Props {
    imageURL: string;
    name: string;
}

function FilmCard(props: Props) {
  return (
    <>
      <Card sx={{ maxWidth: 200 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="300"
            image={props.imageURL}
            alt={props.name}
            style={{ objectFit: 'contain' }} // this will resize the image to fit within the CardMedia component
          />
          <CardContent>
            {/* <Typography gutterBottom variant="h1" component="div">
            Episode 1 (A Phantom Menace)
            </Typography> */}
            {props.name}
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  )
}

export default FilmCard