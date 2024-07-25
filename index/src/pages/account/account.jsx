import React, { useContext } from 'react';
import { AccountInput } from './accountComponents/accountInput.jsx';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { AppContext } from '../../provider/AppContext.js';
import { instance } from '../../httpServer.js';

const deleteUser = async (username) => {
  const res = await instance.delete(`/user/${username}`);
  return res.data;
};

const Account = ({ username }) => {
  const { isLogged, handleLogout, user} = useContext(AppContext);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const result = await deleteUser(user.username);
      if (result && !result.error) {
        handleLogout();
        navigate('/');
      }
    } catch (err) {
      // setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className='max-w-lg mx-auto'>
      <div>
        <div className='grid grid-cols-3 place-items-center mt-20'>
          <Link to={'/aboutuser'}>About</Link>
          <Link to={'/menuuser'}>Home</Link>
          <Link to={'/workshop'}>Workshop</Link>
        </div>
        <Outlet />
      </div>
      <div className=' rounded-md border-2 border-black mt-20 flex justify-center items-center p-20 flex-col'>
        <h2 className='text-5xl font-bold text-center'>Account Info</h2>
        <AccountInput username={username} />
       {isLogged && <div className='grid grid-cols-2 place-items-center-mt-20'>
          <Link to='/' onClick={handleLogout} className='px-10 py-3 mt-5 bg-black w-min text-white text-center rounded-md'>
            Logout (Bye!)
          </Link>
          <button onClick={handleDelete} className='px-10 py-3 mt-5 bg-black w-min text-white rounded-md'>Delete Account</button>
        </div>}
      </div>
    </div>
  );
};

export default Account;
