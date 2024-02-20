import React, { createContext, useEffect, useState } from 'react'
import { jwtDecode } from "jwt-decode";
export const UserContext = createContext()

const UserProvider = ({children}) => {
    const [userToken, setUserToken] = useState(localStorage.getItem('token')?JSON.parse(localStorage.getItem('token')):null)
    const [user, setUser] = useState(null);
    useEffect(() => {
      
    localStorage.setItem('token',JSON.stringify(userToken))
    }, [userToken])

    useEffect(() => {
        if (userToken) {
            // Decode the token only if it exists and is valid
            try {
                const decodedToken = jwtDecode(userToken);
                setUser(decodedToken);
                localStorage.setItem('token',JSON.stringify(userToken))
            } catch (error) {
                console.error('Invalid token:', error.message);
                // If the token is invalid, clear it from localStorage and setUser to null
                localStorage.removeItem('token');
                setUser(null);
                localStorage.setItem('token',null)
            }
        } else {
            // If no token exists, setUser to null
            setUser(null);
        }
    }, [userToken]);
    
    const data = {
        userToken,
        setUserToken,
        user
    }
  return (
    <UserContext.Provider value={data}>
        {children}
    </UserContext.Provider>
  )
}

export default UserProvider