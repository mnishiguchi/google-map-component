import React from 'react';
import { connect } from 'react-redux';
import MapComponent from './components/MapComponent';
import SearchFilterModule from './components/SearchFilterModule';
import SearchList from './components/SearchList';
import { fetchPropertyList, fetchDirection } from '../../actions';

class MapSearchListScreen extends React.PureComponent {
  componentDidMount() {
    // Set dataArray if not already.
    if (this.props.dataArray.length < 1) {
      this.props.dispatch(fetchPropertyList());
    }

    // TODO: Create a direction form component and move code there.
    if (!this.props.direction) {
      this.props.dispatch(fetchDirection());
    }
  }

  render() {
    const { dataArray } = this.props;

    // react-virtualzed's AutoSizer requires specific height value of a wrapper node.
    return (
      <div style={{ display: 'flex', height: '94vh' }}>
        <div style={{ flex: 1 }}>
          <MapComponent isMarkerShown dataArray={dataArray} />
        </div>

        <div style={{ width: '400px', overflowY: 'hidden' }}>
          <SearchFilterModule />

          <div style={{ height: '90vh' }}>
            <SearchList dataArray={dataArray} />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    dataArray: state.property.list || []
  };
};

export default connect(mapStateToProps)(MapSearchListScreen);
