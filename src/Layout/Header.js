import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header
    className="navbar"
    role="navigation"
    aria-label="main navigation"
    style={{
      height: '60px',
      lineHeight: '60px'
    }}
  >
    <div className="container">
      <h1>Google Maps Experiments</h1>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </div>
  </header>
);

export default Header;
