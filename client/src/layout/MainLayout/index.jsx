import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import "./index.scss";
import Footer from "../Footer";

const MainLayout = () => {
  return (
    <>
      <div className="main-container">
        <div className="content-container">
          <Navbar />
        </div>
        <div className="outlet-container">
        <Outlet />
        </div>
          
      </div>
    </>
  );
};

export default MainLayout;
