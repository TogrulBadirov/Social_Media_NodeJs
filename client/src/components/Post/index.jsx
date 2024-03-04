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
                src="https://thumbs.dreamstime.com/b/default-avatar-profile-icon-social-media-user-vector-default-avatar-profile-icon-social-media-user-vector-portrait-176194876.jpg"
                alt=""
              />
            </div>
          </div>
          <div className="username-date">
          <NavLink className="link" to={`/profile/${ item.user._id}`}>
            <h4 className="profile-name">{item.user.fullName}</h4>
                  </NavLink>
            <p className="post-upload-date">{item.timeAgo} {item.isAiGenerated === "true" ? <div className="ai-generated">AI Generated</div>:""}</p>
          </div>
        </div>
        <div className="post-settings">
          <button onClick={handleClick} className="settings-button">
            {/* <MoreVertIcon /> */}
            ...
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
                    <NavLink className="link" to={`/profile/${ item.user._id}`}>

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
                    </NavLink>

                  </MenuItem>
                  </Menu>
      </div>
      <div className="post-image">
        <img src={item.imageUrl} alt="" />
      </div>
      <div className="post-actions">
        <div className="like-comment">
          <div className="likes">
            <button onClick={toggleLike} className="action-button like-button">
              {isLiked ? <GoHeartFill className="red-heart" /> : <GoHeart />}
            </button>
            <p>{likesCount} Likes</p>
          </div>
          <div className="comments">
            {/* <button className="action-button comment-button">
              <IoChatbubbleOutline />
            </button>
            <p>21Comments</p> */}
          </div>
        </div>
        <div className="share">
          <button onClick={toggleSave} className="action-button share-button">
            {isSaved ? <FaBookmark /> : <FaRegBookmark />}
          </button>
        </div>
      </div>
      <div className="post-description">
        <p>{item.caption}</p>
      </div>
    </div>
  );
}

export default Post;
