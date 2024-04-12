import { Link } from 'react-router-dom';
import React from 'react';
import '../../styling/homePage.scss';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Code Vision</h1>
      <Link to="/Login" className="login-button" style={{ textDecoration: 'none' }}>
        Login
      </Link>
    </div>
  );
};

export default HomePage;
