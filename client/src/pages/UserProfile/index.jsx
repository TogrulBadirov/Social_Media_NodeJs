import React, { useEffect, useState } from 'react';
import { MDBCol, MDBContainer, MDBRow, MDBCard, MDBCardTitle, MDBCardText, MDBCardBody, MDBBtn } from 'mdb-react-ui-kit';
import { Avatar, Button, Grid, ImageList, ImageListItem, Paper, Tab, Tabs, Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import "./index.scss"
import Navbar from '../../layout/Navbar';
import backendURL from '../../config';
import axios from 'axios';
const tabContentStyle = {
  padding: '0',
};


const UserProfile = () => {
  const [value, setValue] = React.useState(0);
  const {id} = useParams()
  const [userData, setUserData] = useState(null)
  const getUser = async () => {
    try {
      const resp = await axios.get(`${backendURL}/user/${id}`);
      setUserData(resp.data)

    } catch (error) {
      console.log(error);
    }
  };
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
   getUser()
  }, [])
  
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
                        <MDBCardTitle>{userData && userData.fullName}</MDBCardTitle>
                        <MDBCardText>{userData && userData.email}</MDBCardText>
                        <div className="d-flex justify-content-start rounded-3 p-2 mb-2"
                          style={{ backgroundColor: '#333', color:"#fff" }}>
                          <div >
                            <p className="small text-muted mb-1 text-white-50" >Posts</p>
                            <p className="mb-0" >{userData && userData.posts.length}</p>
                          </div>
                          <div className="px-3" >
                            <p className="small text-muted mb-1 text-white-50">Followers</p>
                            <p className="mb-0">0</p>
                          </div>
                        </div>
                        <div className="d-flex pt-1" >
                          {/* <Button outline className="me-1 flex-grow-1" style={{  color:"#fff" }}>Chat</Button>
                          <Button className="flex-grow-1" style={{  color:"#333", backgroundColor:"#fff" }}>Follow</Button> */}
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
                             {userData && userData.posts.map((item) => (
                               <ImageListItem key={item._id}>
                                 <img
                                   srcSet={`${item.imageUrl}`}
                                   src={`${item.imageUrl}`}
                                   alt={item.imageUrl}
                                   loading="lazy"
                                 />
                               </ImageListItem>
                             ))}
                           </ImageList>
                      </div>
                      <div role="tabpanel" hidden={value !== 1}>
                        <Typography variant="h6">Saved Posts</Typography>
                        <ImageList   cols={3} rowHeight={164}>
                             {userData && userData.savedPosts.map((item) => (
                               <ImageListItem key={item._id}>
                                 <img
                                   srcSet={`${item.imageUrl}`}
                                   src={`${item.imageUrl}`}
                                   alt={item.imageUrl}
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
