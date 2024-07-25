import React from 'react';
import './create.css';
import { CreateInputs } from './createComponents/createInput.jsx';
import { Link, Outlet } from 'react-router-dom';

const Create = () => {
  return (
    <div>
      <div className='max-w-lg mx-auto '>
        <div className='grid grid-cols-4 place-items-center mt-20'>
          <Link to={'/aboutuser'}>About</Link>
          <Link to={'/menuuser'}>Home</Link>
          <Link to={'/workshop'}>Workshop</Link>
          <Link to={'/account'}>Account</Link>
        </div>
        <Outlet />
      </div>
      <div className='w-full rounded-md border-2 border-black mt-20 flex justify-center  items-center p-20 flex-col'>
        <h2 className='text-5xl font-bold text-center mb-10'>Create a New Article</h2>
        <CreateInputs />
      </div>
    </div>
  )
};

export default Create;