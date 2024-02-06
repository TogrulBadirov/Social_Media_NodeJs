import { Link, NavLink } from "react-router-dom"
import "./index.scss"
const Navbar = () => {
  return (
    <nav>
    <div id="desktop-nav">
      <h3>MY LOGO</h3>
    <ul>
    <li><NavLink className="link" to="/">Home</NavLink></li>
    <li><NavLink className="link" to="/login">Login</NavLink></li>
    <li><NavLink className="link" to="/register">Register</NavLink></li>
    </ul>
    </div>
    <div id="mobile-nav">
    <ul>
    <li><NavLink className="link" to="/">Home</NavLink></li>
    <li><NavLink className="link" to="/login">Login</NavLink></li>
    <li><NavLink className="link" to="/register">Register</NavLink></li>
    </ul>
    </div>
    </nav>
  )
}

export default Navbar