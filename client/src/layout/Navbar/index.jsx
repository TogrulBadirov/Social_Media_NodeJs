import { Link, NavLink, useNavigate } from "react-router-dom";
import "./index.scss";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from "@mui/material/Avatar";
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
  console.log(user);
  const navigate = useNavigate();
  return (
    <nav>
      <div id="desktop-nav">
        <div className="logo-navigations">
          <h3>MY LOGO</h3>
          <ul>
            <li>
              <NavLink className="link" to="/">
                Home
              </NavLink>
            </li>
            {userToken ? (
              <>
                <li>
                  <NavLink className="link" to="/profile">
                    Profile
                  </NavLink>
                  
                </li>
                <li>
                <NavLink className="link" to="/chat">
                    Chat
                  </NavLink>
                  
                </li>
                <li>
                <NavLink className="link" to="/chatV2">
                    ChatV2
                  </NavLink>
                </li>
                <li>
                <NavLink className="link" to="/newPost">
                newPost
                  </NavLink>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink className="link" to="/login">
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink className="link" to="/register">
                    Register
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
        {/* <Avatar alt="Remy Sharp" src="https://cdn.pixabay.com/photo/2023/09/19/12/59/eagle-8262555_1280.jpg" /> */}
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
              Home
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/login">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink className="link" to="/register">
              Register
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
