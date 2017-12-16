import React from 'react';
import MapComponent from './components/MapComponent';
import SearchFilterModule from './components/SearchFilterModule';
import SearchList from './components/SearchList';

class MapSearchListScreen extends React.PureComponent {
  render() {
    const { dataArray } = this.props;

    // react-virtualzed's AutoSizer requires specific height value of a wrapper node.
    return (
      <React.Fragment>
        <div style={{ display: 'flex', height: '92vh' }}>
          <div style={{ flex: 1 }}>
            <MapComponent isMarkerShown dataArray={dataArray} />
          </div>

          <div style={{ width: '400px', overflowY: 'hidden' }}>
            <SearchFilterModule />
            <SearchList dataArray={dataArray} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default MapSearchListScreen;
