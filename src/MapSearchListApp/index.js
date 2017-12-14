import React from 'react';
import { Marker } from 'react-google-maps';
import Layout from './Layout';
import MapComponent from './components/MapComponent';
import SearchFilterModule from './components/SearchFilterModule';
import SearchList from './components/SearchList';
import './MapSearchListApp.css';

class MapSearchListApp extends React.PureComponent {
  render() {
    const dataArray = this.props.dataArray.slice(0, 20);

    return (
      <Layout>
        <div className="mapListContainer">
          <div className="mapColumn">
            <MapComponent isMarkerShown dataArray={dataArray}>
              <React.Fragment>
                {dataArray.map(place => (
                  <Marker
                    key={place.yelpUid}
                    position={{
                      lat: Number(place.latitude),
                      lng: Number(place.longitude)
                    }}
                  />
                ))}
              </React.Fragment>
            </MapComponent>
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
