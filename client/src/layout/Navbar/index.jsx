import { Link, NavLink, useNavigate } from "react-router-dom";
import "./index.scss";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from "@mui/material/Avatar";
import { MdOutlineHome } from "react-icons/md";
import { FaRegUser } from "react-icons/fa6";
import { IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { FiPlusCircle } from "react-icons/fi";
import { FiVideo } from "react-icons/fi";
import { PiGameControllerLight } from "react-icons/pi";
import { IoIosLogIn } from "react-icons/io";
import { LuUserPlus2 } from "react-icons/lu";
import axios from "axios";
import backendURL from "../../config";
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


const Navbar = () => {
  const { userToken, setUserToken, user } = useContext(UserContext);
  const [logo, setLogo] = useState(null);
  const navigate = useNavigate();
  const fetchLogo = async () => {
    try {
      const response = await axios.get(`${backendURL}/admin/logo`);
      setLogo(response.data);
    } catch (error) {
      console.error('Error fetching logo:', error);
    }
  };

  useEffect(() => {

    fetchLogo();
  }, []);
  return (
    <nav>
      <div id="desktop-nav">
        <div className="logo-navigations">
          <h3>{logo && logo.imageUrl}</h3>
          <ul>
            <li>
              <NavLink className="link" to="/">
              <MdOutlineHome /> Home
              </NavLink>
            </li>
            {userToken ? (
              <>
                <li>
                  <NavLink className="link" to={`/profile/${user && user._id}`}>
                  <FaRegUser /> Profile
                  </NavLink>
                  
                </li>
                <li>
                <NavLink className="link" to="/newPost">
                <FiPlusCircle /> New Post
                  </NavLink>
                </li>
                <li>
                <NavLink className="link" to="/Games">
                <PiGameControllerLight /> Games
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink className="link" to="/login">
                  <FaRegUser /> Login
                  </NavLink>
                </li>
                <li>
                  <NavLink className="link" to="/register">
                  <LuUserPlus2 /> Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
{user ? 

<>
<div className="profile">
        <div className="profile-image">
        <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        variant="dot"
      >
        <Avatar alt={user.fullName} src={user.image} />
      </StyledBadge>
      <div className="fullName-username">
      <p className="profile-name">{user.fullName}</p>
      <p className="username">@{user.username}</p>
      </div>
        </div>
          <Button
          onClick={()=>setUserToken(null)}
            className="logOut"
            variant="outlined"
            startIcon={<LogoutIcon />}
          >
            Log Out
          </Button>
        </div></>
        :
        <>
<div className="profile">
        
          <Button
          onClick={()=>navigate("login")}
            className="logOut"
            variant="outlined"
            startIcon={<LogoutIcon />}
          >
            Sign In
          </Button>
        </div></>}
      </div>
      <div id="mobile-nav">
      <ul>
            <li>
              <NavLink className="link" to="/">
              <MdOutlineHome /> 
              </NavLink>
            </li>
            {userToken ? (
              <>
                <li>
                <NavLink className="link" to={`/profile/${user && user._id}`}>
                  <FaRegUser /> 
                  </NavLink>
                  
                </li>
                <li>
                <NavLink className="link" to="/newPost">
                <FiPlusCircle /> 
                  </NavLink>
                </li>
                <li>
                <NavLink className="link" to="/Games">
                <PiGameControllerLight /> 
                  </NavLink>
                </li>
                <li>
                <Button
          onClick={()=>setUserToken(null)}
            className="logOut"
            variant="outlined"
            startIcon={<LogoutIcon />}
          >
          </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink className="link" to="/login">
                  <FaRegUser /> Login
                  </NavLink>
                </li>
                <li>
                  <NavLink className="link" to="/register">
                  <LuUserPlus2 /> Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
      </div>
    </nav>
  );
};

export default Navbar;
