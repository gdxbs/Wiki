import React, { useContext } from 'react';
import './components.css';
import { AppContext } from '../../../provider/AppContext';

export const AboutInput = () => {

  const { isLogged, handleLogout, user} = useContext(AppContext);

  return  <div>
    <p className='text-3xl font-bold text-center'>{user?.first_name} </p>
  </div>
  };
