import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const PrivateRoute = () => {
  const { userToken, setUserToken, user } = useContext(UserContext);
  const navigate = useNavigate();
    useEffect(() => {
        userToken ? <Outlet /> : navigate("/login")
    }, [])
    
//   return <>{userToken === null ? "" : userToken ? <Outlet /> : navigate("/login")}</>;
  return <>{userToken ? <Outlet /> : navigate("/login")}</>;
};

export default PrivateRoute;
