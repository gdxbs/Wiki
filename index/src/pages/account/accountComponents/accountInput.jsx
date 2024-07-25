import React, { useContext } from 'react';
import './components.css';
import { AppContext } from '../../../provider/AppContext';

export const AccountInput = () => {

  const { user } = useContext(AppContext)

  return  <div>
    <p className='text-3xl font-bold text-center'>
    Name: {user?.first_name} {user?.last_name}
    </p>
    <p className='text-3xl font-bold text-center'>Email: {user?.username}</p>
  </div>
  };

