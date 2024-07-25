import React, { useEffect, useState } from  'react'
import { instance } from '../httpServer';


export const AppContext = React.createContext()

const getProfile = async () => {
    const res = await instance.get('/user/profile'); // This is the route we're hitting
    return res.data; // This is the response data from the server
  };

const AppProvider = ({children}) => { 
    const [user, setUser] = React.useState(null)
  const [error, setError] = useState(null);

    const isLogged = !!user

    const getProfileHandle = async () => {
        try {
          const result = await getProfile(); 
          if (result && !result.error) {
            setUser(result.user); // Set the user in state
          }
        } catch (err) {
          setError(err.response?.data?.message || err.message);
        }
      };

      useEffect(() => {
        getProfileHandle();
      }, []);


      const handleLogout = () => { 
        setUser(null);
        localStorage.removeItem('token')
      };
    

    return <AppContext.Provider value={{user, setUser, isLogged, handleLogout}}>{children}</AppContext.Provider>
}

export default AppProvider