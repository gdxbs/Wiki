// Workshop.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WorkshopHeader from './workshopComponents/workshopHeader';
import WorkshopItem from './workshopComponents/workshopItem';
import { instance } from '../../httpServer';

const getArticles = async () => {
  const res = await instance.get('/article/user');
  return res.data;
};

const deleteArticle = async (id) => {
  const res = await instance.delete(`/article/${id}`);
  return res.data;
};

const Workshop = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getArticlesHandle = async () => {
    try {
      const result = await getArticles();
      if (result && !result.error) {
        setArticles(result.articles);
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const result = await deleteArticle(id);
      if (result && !result.error) {
        getArticlesHandle();
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
      <WorkshopHeader />
      <div className="max-w-xl mx-auto ">
      <div className="border-2 border-black mt-20 flex justify-center items-center p-20 flex-col">
        <h2 className="text-5xl font-bold text-center">Workshop</h2>
        <p className="text-2xl font-bold text-center mt-5">
          Click on an article to edit it, or create a new article.
        </p>
        <div className="grid grid-cols-2 gap-10">
          {articles?.map((article) => (
            <WorkshopItem
              key={article.article_id}
              article={article}
              handleDelete={handleDelete}
              navigate={navigate}
            />
          ))}
        </div>
        <div className="max-w-lg mx-auto mt-20">
          <div className="grid grid-cols-1 place-items-center">
            <button onClick={() => navigate('/workshop/create/')}>
              <img
                src={`/images/Create.png`}
                alt="Button Icon"
                className="button-icon"
                style={{ width: '40px', height: '40px' }}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Workshop;