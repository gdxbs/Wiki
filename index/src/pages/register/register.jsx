import React from 'react';
import './register.css';
import { RegisterInput } from './registerComponents/registerInput.jsx';
import { Link, Outlet } from 'react-router-dom';

const Register = () => {
  return (
    <div className='max-w-lg mx-auto '>
    <div>
      <div className='grid grid-cols-3 place-items-center mt-20'>
        <Link to={'/'}>About</Link>
        <Link to={'/menu'}>Home</Link>
        <Link to={'/login'}>Login</Link>
      </div>
      <Outlet />
    </div>
    <div className='w-full rounded-md border-2 border-black mt-20 flex justify-center  items-center p-20 flex-col'>
    <h2 className='text-5xl font-bold text-center'>Register</h2>
    <RegisterInput />
  </div></div>
  );
};

export default Register;