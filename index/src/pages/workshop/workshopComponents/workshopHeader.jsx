import React from 'react';
import { Link } from 'react-router-dom';

const WorkshopHeader = () => {
  return (
    <div className="max-w-lg mx-auto">
      <div className="grid grid-cols-3 place-items-center mt-20">
      <Link to="/aboutuser">About</Link>
      <Link to="/menuuser">Home</Link>
      <Link to="/account">Account</Link>
    </div>
  </div>
  );
};

export default WorkshopHeader;
