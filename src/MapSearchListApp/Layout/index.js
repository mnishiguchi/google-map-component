import React from 'react';
import Header from './Header';
import './Layout.css';

const Layout = ({ children }) => (
  <div className="Layout">
    <div className="Layout__row">
      <Header />
    </div>

    <div className="Layout__row">{children}</div>
  </div>
);

export default Layout;
