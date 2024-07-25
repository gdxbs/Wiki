import React, { useEffect, useState } from 'react';
import './components.css';
import { Input, Button } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { instance } from '../../../../httpServer';

const getArticleById = async (id) => {
  const res = await instance.get(`/article/${id}`);
  return res.data;
};

export const EditInputs = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = React.useState(null);
  const navigate = useNavigate();
  const [file, setFile] = useState();
  const { id } = useParams();

  const getArticleHandle = async () => {
    try {
      const result = await getArticleById(id);
      console.log(result);
      if (result && !result.error) {
        setFormData(result.article);
      }
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    getArticleHandle();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const updateArticle = async (id, body, file) => {
    try {
      const formData = new FormData();
      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value);
      });
      formData.append('picture', file);
      const res = await instance.put(`/article/${id}`,formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return res.data;
    } catch (error) {
      throw error;
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await updateArticle(id, formData, file);
      console.log(result);
      if (result && !result.error) {
        navigate('/workshop');
      }
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div>
      <label>Creator Name:</label>
      <Input
        name="creator_name"
        value={formData?.creator_name}
        onChange={handleInputChange}
      />

      <label>Title:</label>
      <Input name="title" value={formData?.title} onChange={handleInputChange} />

      <label>Text:</label>
      <textarea
        name="text"
        value={formData?.text}
        onChange={handleInputChange}
        rows={5}
        style={{ width: '100%' }} // Set the width to 100%
      />

      <div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>

      <label>Picture Caption:</label>
      <Input name="pic_caption" value={formData?.pic_caption} onChange={handleInputChange} />

      <Button type="primary" onClick={handleSubmit} className="buttonCustomColor">
        Update Article
      </Button>
      {error && <small className='error-message'>{error}</small>}
    </div>
  );
};
