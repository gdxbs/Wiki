import React, { useState } from 'react';
import './components.css';
import { Input, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { instance } from '../../../../httpServer';

export const CreateInputs = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = React.useState(null);
  const [file, setFile] = useState();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((formData) => ({ ...formData, [name]: value }));
  };

  const postArticle = async (body, file) => {
    try {
      const formData = new FormData();
      formData.append('picture', file);
  
      // Append other article data to the FormData
      Object.entries(body).forEach(([key, value]) => {
        formData.append(key, value);
      });
  
      const res = await instance.post('/article', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      return res.data;
    } catch (err) {
      throw err;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const body = {
      article_id: new Date().getTime(),
      ...formData,
    };
  
    try {
      const result = await postArticle(body, file);
      console.log(result);
      if (result && !result.error) {
        navigate('/workshop');
      }
    } catch (err) {
      console.log(err.response?.data?.message || err.message);
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); 
  };

  return (
    <div>
      <label>Creator Name:</label>
      <Input name="creator_name" value={formData?.creator_name} onChange={handleInputChange} />

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
        Create Article
      </Button>

      {error && <small className='error-message'>{error}</small>}
    </div>
  );
};
