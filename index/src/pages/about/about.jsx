import React from 'react';
import './about.css';
import { Link, Outlet } from 'react-router-dom';

const About = () => {
  return (
    <div className='max-w-lg mx-auto'>
      <div className='grid grid-cols-3 place-items-center mt-20'>
        <Link to={'/menu'}>Home</Link>
        <Link to={'login/'}>Login</Link>
        <Link to={'/register'}>Register</Link>
      </div>
      <div className='border tw-relative min-h-[450px] rounded-sm border-black mt-10 py-2 px-4'>
        <div className='flex items-center'>
          <div className='w-full'>
            <h2 className='text-5xl font-bold '>Wiki4Anything</h2>
            <p className='md:max-w-[60%] mt-4'>
              This wiki website is dedicated to well... anything. Feel free to scroll through our forums or create your own.
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
  );
};

export default About;
