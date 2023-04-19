import React, { useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './MyCard.css';


interface Props {
    imageURL: string;
    name: string;
}



function MyCard(props: Props) {
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
          const classList = entry.target.classList;
          // console.log(entry);
          // console.log(classList);
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

  const navigate = useNavigate();
  function handleClick(cardName: string) {
      console.log("Card clicked with name of " + cardName);
  }

  return (
    <>
      <div className='card-container hidden-2'>
        <Card onClick={() => handleClick(props.name)} style={{ maxWidth: "70%", maxHeight: "100%", margin: "auto" }}>
          
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
              alt={props.name}
            />
            <CardContent>
                <div className='card-content'>
                  {props.name}
                </div>
            </CardContent>

          </CardActionArea>
        </Card>
      </div>

    </>
  )
}

export default MyCard