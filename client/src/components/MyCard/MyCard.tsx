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
    {/* sx={{ maxWidth: 1000 }} */}
      <Card style={{ maxWidth: "70%", maxHeight: "100%", margin: "auto" }}>
        
        <CardActionArea>
          <CardMedia
            component="img"
            image={props.imageURL}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              width: "auto",
              height: "auto",
              objectFit: 'contain'
            }}
            alt={props.name}
          />
          <CardContent>
              <div className='card-content'>
                {props.name}
              </div>
          </CardContent>

        </CardActionArea>
      </Card>
    </>
  )
}

export default FilmCard