import React, { useContext, useEffect, useState } from "react";
import "./index.scss";
import axios from "axios";
import backendURL from "../../../config";
import { UserContext } from "../../../context/UserContext";

import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { Button } from "@mui/material";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const { userToken, setUserToken, user } = useContext(UserContext);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const deletePostClicked = async ( id ) => {
    try {
      // Send the DELETE request with the user token in the headers
      await axios.delete(`${backendURL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${userToken}` // Include the token in the Authorization header
        }
      });
  
      // Remove the deleted post from the local state
      setPosts(posts.filter(post => post._id !== id));
    } catch (error) {
      console.error("Error deleting post:", error);
      // Handle error
    }
  };

  useEffect(() => {
    async function getPosts() {
      try {
        const result = await axios.get(`${backendURL}/posts`, {
          headers: {
            Authorization: `Bearer ${userToken}`, // Include the token in the Authorization header
          },
        });
        setPosts(result.data);
        console.log(result.data);
      } catch (error) {
        console.error("Error fetching posts:", error);
        // Handle error
      }
    }
    getPosts();
  }, []);
  return (
    <section id="Posts">
      <div className="container">
        <div className="post-filter">
          <button className="active">Following</button>
          <button>Popular</button>
        </div>
        <div className="posts">
          {posts &&
            posts.map((item) => (
              <div key={item._id} className="post">
                <div className="user-info">
                  <div className="user-data-container">
                    <div className="image-border">
                      <div className="profile-image">
                        <img
                          src="https://images.pexels.com/photos/1310474/pexels-photo-1310474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="username-date">
                      <h4 className="profile-name">{item.user.fullName}</h4>
                      <p className="post-upload-date">32 min. ago{item._id}</p>
                    </div>
                  </div>
                  <div className="post-settings">
                  {item.isAuthor !== "false" ?
                     <Button
                     sx={{
                       color: "red",
                       backgroundColor:"#000",
                      
                     }}
                     
                     startIcon={<DeleteIcon />}
                     onClick={()=>deletePostClicked(item._id)}
                   >
                     Delete
                   </Button>
                  :
                  <>
                  </>
                    }
                 
                    <button onClick={handleClick} className="settings-button">
                      ···
                    </button>
                  </div>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                    
                  >
                    {item.isAuthor ?
                    <MenuItem  onClick={handleClose}>
                    <Button
                      sx={{
                        color: "red",
                        backgroundColor:"#000",
                       
                      }}
                      
                      startIcon={<DeleteIcon />}
                      onClick={()=>deletePostClicked(item._id)}
                    >
                      Delete
                    </Button>
                  </MenuItem>
                  :
                  <>
                  </>
                    }
                    
                  </Menu>
                </div>
                <div className="post-image">
                  <img src={item.imageUrl} alt="" />
                </div>
                <div className="post-actions">
                  <div className="like-comment">
                    <div className="likes">
                      <button className="action-button like-button">+</button>{" "}
                      <p>201 Likes</p>
                    </div>
                    <div className="comments">
                      <button className="action-button comment-button">
                        C
                      </button>
                      <p>12 Comment</p>
                    </div>
                  </div>

                  <div className="share">
                    <button className="action-button share-button">+</button>
                  </div>
                </div>
                <div className="post-description">
                  <p>{item.caption}</p>
                </div>
              </div>
            ))}

          {/* <div className="post">
            <div className="user-info">
              <div className="user-data-container">
                <div className="image-border">
                  <div className="profile-image">
                    <img
                      src="https://images.pexels.com/photos/1310474/pexels-photo-1310474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      alt=""
                    />
                  </div>
                </div>
                <div className="username-date">
                  <h4 className="profile-name">Guest User</h4>
                  <p className="post-upload-date">32 min. ago</p>
                </div>
              </div>
              <div className="post-settings">
                <button className="settings-button">···</button>
              </div>
            </div>
            <div className="post-image">
              <img
                src="https://images.pexels.com/photos/773147/pexels-photo-773147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
            </div>
            <div className="post-actions">
              <div className="like-comment">
                <div className="likes">
                  <button className="action-button like-button">+</button> <p>201 Likes</p>
                </div>
                <div className="comments">
                  <button className="action-button comment-button">C</button>
                  <p>12 Comment</p>
                </div>
              </div>

              <div className="share">
                <button className="action-button share-button">+</button>
              </div>
            </div>
            <div className="post-description">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae ullam omnis suscipit, expedita et odio dolorum iusto deserunt aliquid! Voluptate explicabo at dignissimos similique, ducimus magni possimus aperiam laborum a nulla rerum, soluta quasi enim sequi praesentium dolor ab natus sunt ipsa ipsam laudantium necessitatibus. Quam praesentium placeat dolorum temporibus!</p>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Posts;
