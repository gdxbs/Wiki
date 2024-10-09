import React, {useEffect, useState } from 'react';
//import {MenuUserInput} from './menuUserComponents/menuUserInput.jsx';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { instance } from '../../httpServer.js';

//Tried to change this
const getArticles = async () => {
  //function to make login request to server
  const res = await instance.get('/wikipage');
  return res.data;
}

const MenuUser = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = React.useState(null); //state to store error message
const navigate = useNavigate(); //using navigate hook to navigate to home page after login
  const getArticlesHandle = async (e) => {
 
    try {
      const result = await getArticles();
      console.log(result);
      if (result && !result.error) {
        setArticles(result.articles);
      }
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message);
    }
  };


  useEffect(() => {
    getArticlesHandle()
  }, []);

 
  return (
    <div>
    <div className='max-w-lg mx-auto '>
      <div className='grid grid-cols-3 place-items-center mt-20'>
        <Link to={'/aboutuser'}>About</Link>
        <Link to={'/account'}>Account</Link>
        <Link to={'/workshop'}>Workshop</Link>
      </div>
      <Outlet />
    </div>
    <div className='w-full rounded-md border-2 border-black mt-20 flex justify-center  items-center p-20 flex-col'>
      <h2 className='text-5xl font-bold text-center'>Menu</h2>
      <p className='text-2xl font-bold text-center'>Click on an article to view it.</p>
      <div className='grid grid-cols-2 gap-10'>

   {articles?.map((article) => (
     <div key={article.article_id}
      onClick={() => {navigate(`/wikipageuser/${article.article_id}`)}}
      className='w-full rounded-md border-2 border-black mt-20 flex justify-center cursor-pointer items-center p-20 flex-col'>
        <h2 className='text-5xl font-bold text-center'>{article.title}</h2>
        <h2 className='text-2xl font-bold text-center'>Creator: {article.creator_name}</h2>
        </div>
      ))}
      </div>
      <div className='max-w-lg mx-auto '>
      <Outlet />
    </div>
    </div>
    </div>
  );
};

export default MenuUser;