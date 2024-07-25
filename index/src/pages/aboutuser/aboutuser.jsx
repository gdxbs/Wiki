import React, { useContext } from 'react';
import './aboutuser.css';
import { Link, Outlet } from 'react-router-dom';
import { AppContext } from '../../provider/AppContext.js';

const AboutUser = () => {
  const { isLogged, handleLogout, user} = useContext(AppContext);
  return    <div>
  <div className='max-w-lg mx-auto '>
      <div className='grid grid-cols-3 place-items-center mt-20'>
        <Link to={'/menuuser'}>Home</Link>
        <Link to={'/account'}>Account</Link>
        <Link to={'/workshop'}>Workshop</Link>
        </div>
      <div className='border tw-relative min-h-[450px] rounded-sm border-black mt-10 py-2 px-4'>
        <div className='flex items-center'>
          <div className='w-full'>
            <h2 className='text-5xl font-bold  '>Wiki4Anything</h2>
            <p className='md:max-w-[60%] mt-4'>
              This wiki website is dedicated to well... anything. Feel free to scroll through our forums or create your own.
            </p>
            <p className='md:max-w-[60%] mt-4'>
              Welcome Back {user?.first_name}! Nice name btw.
            </p>
            <span className='absolute bottom-4 font-bold'>@wiki4anything</span>
          </div>
          <div>
            <img src={`/images/aboutdesign2.png`} alt='design' className='tw-w-[350px] tw-absolute tw-bottom-7 tw-right-5' />
          </div>
        </div>
      </div>
      <Outlet />
    </div>
    </div>
};

export default AboutUser;
