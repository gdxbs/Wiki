import React, { useState } from 'react';
import './components.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
 
export const AboutInput = () => {
  const [aboutText, setAboutText] = useState('');

  const handleChange = (event) => {
    setAboutText(event.target.value);
  };

  const handleSubmit = () => {
    // Send the about text to the server or perform any necessary actions
    console.log('About text:', aboutText);
  };

  return (
    <div className="about-input-container">
      <textarea
        className="about-input"
        placeholder="Enter your about information here"
        value={aboutText}
        onChange={handleChange}
      />
      <button className="about-submit-btn" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

