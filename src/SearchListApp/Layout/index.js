import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './Layout.css';

const Layout = ({ children }) => (
  <div className="Layout">
    <div className="Layout__row">
      <Header />
    </div>

    <div className="Layout__row">{children}</div>

    <div className="Layout__row">
      <Footer />
    </div>
  </div>
);

export default Layout;
