import React from 'react';
import Layout from './Layout';
import MapComponent from './components/MapComponent';
import SearchFilterModule from './components/SearchFilterModule';
import SearchList from './components/SearchList';
import './MapSearchListApp.css';

class MapSearchListApp extends React.PureComponent {
  render() {
    const { dataArray } = this.props;

    return (
      <Layout>
        <div className="mapListContainer">
          <div className="mapColumn">
            <MapComponent isMarkerShown dataArray={dataArray} />
          </div>

          <div className="searchListColumn">
            <SearchFilterModule />
            <SearchList dataArray={dataArray} />
          </div>
        </div>
      </Layout>
    );
  }
}

export default MapSearchListApp;
