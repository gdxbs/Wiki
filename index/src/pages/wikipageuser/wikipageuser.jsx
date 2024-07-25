import React, { useEffect, useState } from 'react';
import './wikipageuser.css';
import { Link, Outlet, useParams } from 'react-router-dom';
import { instance } from '../../httpServer';


  const getArticles = async (id) => {
    //function to make login request to server
    const res = await instance.get(`/article/${id}`);
    return res.data;
  };


  
  const WikiPageUser = () => {
    const [article, setArticle] = useState([]);
    const [error, setError] = useState(null);
    const { id } = useParams();
  
    const getArticlesHandle = async () => {
      try {
        const result = await getArticles(id);
        if (result && !result.error) {
          setArticle(result.article);
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    };
  
    useEffect(() => {
      getArticlesHandle();
    }, []);
  
    return (
      <div>
        <div className='max-w-lg mx-auto '>
          <div className='grid grid-cols-4 place-items-center mt-20'>
            <Link to={'/aboutuser'}>About</Link>
            <Link to={'/menuuser'}>Home</Link>
            <Link to={'/account'}>Account</Link>
            <Link to={'/workshop'}>Workshop</Link>
          </div>
          <Outlet />
        </div>
        <div className='w-full rounded-md border-2 border-black mt-20 flex justify-center items-center p-20 flex-col'>
          <div>
            <h2 className="text-5xl font-bold text-center">{article.title}</h2>
            <p className="text-2xl font-bold text-center mt-5">By {article.creator_name}</p>
            <img src={`/images/${article.picture_link}`} alt={`Picture`} className="mt-5" />
            <p className="text-sm font-bold text-gray-500 text-center">{article.pic_caption}</p>
            <div className='w-full rounded-md border-2 border-black mt-20 flex justify-center items-center p-20 flex-col'>
              <p className="text-1xl font-bold text-center mt-5">{article.text}</p>
            </div>
            {error && <small className='error-message'>{error}</small>}
          </div>
        </div>
      </div>
          )
};

export default WikiPageUser;
