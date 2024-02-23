import React from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBBtn } from 'mdb-react-ui-kit';
import { Avatar, Button, Grid, ImageList, ImageListItem, Paper, Tab, Tabs, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import "./index.scss"
import Navbar from '../../layout/Navbar';
const tabContentStyle = {
  padding: '0',
};


const UserProfile = () => {
  const [value, setValue] = React.useState(0);
  const {id} = useParams()
  
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
      title: 'Breakfast',
    },
    {
      img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
      title: 'Burger',
    },
    {
      img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
      title: 'Camera',
    },
    {
      img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
      title: 'Hats',
    },
    {
      img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
      title: 'Honey',
    },
    {
      img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
      title: 'Basketball',
    },
    {
      img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
      title: 'Fern',
    },
    {
      img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
      title: 'Mushrooms',
    },
    {
      img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
      title: 'Tomato basil',
    },
    {
      img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
      title: 'Sea star',
    },
    {
      img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
      title: 'Bike',
    },
  ];
  return (
    <section id='UserProfile'>
      <div className="container">
        <div className="" >
          <MDBContainer>
            <MDBRow className="justify-content-center" >
              <MDBCol md="9" lg="7" xl="5" className="mt-5" >
                <MDBCard style={{ borderRadius: '15px', backgroundColor:"#222" }} >
                  <MDBCardBody className="" >
                    <div className="d-flex text-black flex-wrap">
                      <div className="flex-shrink-0">
                        <Avatar
                          alt="Remy Sharp"
                          src="/static/images/avatar/1.jpg"
                          sx={{ width: 170, height: 170 }}
                        />
                      </div>
                      <div className="flex-grow-1 ms-3" style={{  color:"#fff" }}>
                        <MDBCardTitle>Danny McLoan</MDBCardTitle>
                        <MDBCardText>Senior Journalist</MDBCardText>
                        <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                          style={{ backgroundColor: '#333', color:"#fff" }}>
                          <div >
                            <p className="small text-muted mb-1 text-white-50" >Posts</p>
                            <p className="mb-0" >41</p>
                          </div>
                          <div className="px-3" >
                            <p className="small text-muted mb-1 text-white-50">Followers</p>
                            <p className="mb-0">976</p>
                          </div>
                        </div>
                        <div className="d-flex pt-1" >
                          <Button outline className="me-1 flex-grow-1" style={{  color:"#fff" }}>Chat</Button>
                          <Button className="flex-grow-1" style={{  color:"#333", backgroundColor:"#fff" }}>Follow</Button>
                        </div>
                      </div>
                    </div>
                    <div style={tabContentStyle}>
                      <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="Posts" />
                        <Tab label="Saved Posts" />
                      </Tabs>
                      <div role="tabpanel" hidden={value !== 0}>
                        <Typography variant="h6">My Posts</Typography>
                        <ImageList   cols={3} rowHeight={164}>
                             {itemData.map((item) => (
                               <ImageListItem key={item.img}>
                                 <img
                                   srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                   src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                   alt={item.title}
                                   loading="lazy"
                                 />
                               </ImageListItem>
                             ))}
                           </ImageList>
                      </div>
                      <div role="tabpanel" hidden={value !== 1}>
                        <Typography variant="h6">Saved Posts</Typography>
                        <ImageList   cols={3} rowHeight={164}>
                             {itemData.map((item) => (
                               <ImageListItem key={item.img}>
                                 <img
                                   srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                   src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                   alt={item.title}
                                   loading="lazy"
                                 />
                               </ImageListItem>
                             ))}
                           </ImageList>
                      </div>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </div>
      </div>
    </section>
  );
}

export default UserProfile;
