import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header
    className="level"
    role="navigation"
    aria-label="main navigation"
    style={{
      padding: '.5rem'
    }}
  >
    <div className="level-left">
      <div className="level-item">
        <p className="subtitle is-5">
          <Link to="/">Google Maps Experiments</Link>
        </p>
      </div>
    </div>

    <div className="level-right">
      <p className="level-item">
        <Link to="/">Home</Link>
      </p>
      <p className="level-item">
        <Link to="/about">About</Link>
      </p>
    </div>
  </header>
);

export default Header;
