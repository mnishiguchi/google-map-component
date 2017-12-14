import React from 'react';
import Layout from './Layout';
import MyMapComponent from './components/MyMapComponent';
import SearchFilterModule from './components/SearchFilterModule';
import SearchList from './components/SearchList';
import './SearchListApp.css';

class SearchListApp extends React.PureComponent {
  render() {
    return (
      <Layout>
        <div className="mapListContainer">
          <div className="mapColumn">
            <MyMapComponent isMarkerShown />
          </div>

          <div className="searchListColumn">
            <SearchFilterModule />
            <SearchList />
          </div>
        </div>
      </Layout>
    );
  }
}

export default SearchListApp;
