import React, { useContext, useEffect, useState } from "react";
import "./index.scss";

import DeleteIcon from "@mui/icons-material/Delete";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import backendURL from "../../config";
import axios from "axios";
import { UserContext } from "../../context/UserContext";
import InfoIcon from '@mui/icons-material/Info';
import { GoHeartFill, GoHeart } from "react-icons/go";
import { FaRegComment, FaRegBookmark, FaBookmark } from "react-icons/fa";
import { IoChatbubbleOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

const Post = ({item, setPosts, posts}) => {
    const { userToken, setUserToken, user } = useContext(UserContext);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const [isLiked, setIsLiked] = useState(item && user ? item.likes.includes(user._id) : false);
    const [likesCount, setLikesCount] = useState(item && item.likes ? item.likes.length : 0);
    const [isSaved, setIsSaved] = useState(item.isSaved !== "false");
    
    useEffect(() => {
        if (user && item && item.likes) {
            setIsLiked(item.likes.includes(user._id));
            setLikesCount(item.likes.length);
        }
    }, [item, user]);

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const deletePostClicked = async (id) => {
      try {
        await axios.delete(`${backendURL}/posts/${id}`, {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        });
        setPosts(posts.filter(post => post._id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    };

    const toggleLike = async () => {
        try {
            const response = await axios.post(`${backendURL}/posts/like`, { postId: item._id }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
            setLikesCount(response.data.likesCount);
            setIsLiked(!isLiked);
        } catch (error) {
            console.error("Error toggling like:", error);
        }
    };

    const toggleSave = async () => {
        try {
            setIsSaved(!isSaved);

            const response = await axios.post(`${backendURL}/posts/save`, { postId: item._id }, {
                headers: {
                    Authorization: `Bearer ${userToken}`
                }
            });
        } catch (error) {
            console.error("Error toggling save:", error);
        }
    };

  return (
    <div className="post">
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
          <NavLink className="link" to={`/profile/${ item.user._id}`}>
            <h4 className="profile-name">{item.user.fullName}</h4>
                  </NavLink>
            <p className="post-upload-date">{item.timeAgo}</p>
          </div>
        </div>
        <div className="post-settings">
          <IconButton onClick={handleClick} className="settings-button">
            {/* <MoreVertIcon /> */}
            ...
          </IconButton>
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
                    
                    {item.isAuthor !== "false" ?
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
                    <MenuItem  onClick={handleClose}>
                    <Button
                      sx={{
                        color: "#fff",
                        backgroundColor:"#000",
                       
                      }}
                      
                      startIcon={<InfoIcon />}
                      onClick={()=>console.log('test')}
                    >
                      About Account
                    </Button>
                  </MenuItem>
                  </Menu>
      </div>
      <div className="post-image">
        <img src={item.imageUrl} alt="" />
      </div>
      <div className="post-actions">
        <div className="like-comment">
          <div className="likes">
            <IconButton onClick={toggleLike} className="action-button like-button">
              {isLiked ? <GoHeartFill className="red-heart" /> : <GoHeart />}
            </IconButton>
            <p>{likesCount} Likes</p>
          </div>
          <div className="comments">
            <IconButton className="action-button comment-button">
              <IoChatbubbleOutline />
            </IconButton>
            <p>21Comments</p>
          </div>
        </div>
        <div className="share">
          <IconButton onClick={toggleSave} className="action-button share-button">
            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
          </IconButton>
        </div>
      </div>
      <div className="post-description">
        <p>{item.caption}</p>
      </div>
    </div>
  );
}

export default Post;
