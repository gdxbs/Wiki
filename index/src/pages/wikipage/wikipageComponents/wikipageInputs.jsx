import React, { useEffect, useState } from 'react';
import './components.css';
import { instance } from '../../../httpServer';
import { useNavigate, useParams } from 'react-router-dom';

const getArticleById = async (id) => {
  //function to make login request to server
  const res = await instance.get(`/article/${id}`);
  return res.data;
};

export const WikiPageInputs = () => {
  const [article, setArticle] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();


  const getArticlesHandle = async () => {
    try {
      const result = await getArticleById(id);
      console.log(result);
      if (result && !result.error) {
        setArticle(result.article);
      }
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    getArticlesHandle();
  }, []);

return (
    <div
      onClick={() => navigate(`/workshop/edit/${article.article_id}`)}
      className="w-full rounded-md border-2 border-black mt-20 flex justify-center items-center p-5 flex-col shadow-[rgba(6,24,44,0.4)_0px_0px_0px_2px,_rgba(6,24,44,0.65)_0px_4px_6px_-1px,_rgba(255,255,255,0.08)_0px_1px_0px_inset]">
      <h2 className="text-5xl font-bold text-center">Title: {article.title}</h2>
      <p className="text-2xl font-bold text-center mt-5">By: {article.creator_name}</p>
      <p className="text-1xl font-bold text-center mt-5">{article.text}</p>
      <img src={`/images/${article.picture_link}`} alt={`${article.pic_caption}`} className=" w-100 h-10 mt-10" />
      {error && <small className='error-message'>{error}</small>}
    </div>
  );
  
};