import React from 'react';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import MapComponent from './components/MapComponent';
import SearchList from './components/SearchList';
import DirectionForm from './components/DirectionForm';
import PolygonForm from './components/PolygonForm';
import { fetchPropertyList } from '../../actions';

class MapSearchListScreen extends React.PureComponent {
  componentDidMount() {
    // Set dataArray if not already.
    if (this.props.dataArray.length < 1) {
      this.props.dispatch(fetchPropertyList());
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

        <div style={{ width: '400px', height: '90vh', overflowY: 'hidden' }}>
          <Tabs>
            <TabList className="tabs" style={{ marginBottom: '1px', borderBottom: '1px solid #ccc' }}>
              <Tab>
                <a>List</a>
              </Tab>
              <Tab>
                <a>Polygons</a>
              </Tab>
              <Tab>
                <a>Directions</a>
              </Tab>
            </TabList>

            <TabPanel>
              <div style={{ height: '90vh' }}>
                <SearchList dataArray={dataArray} />
              </div>
            </TabPanel>
            <TabPanel>
              <PolygonForm />
            </TabPanel>
            <TabPanel>
              <DirectionForm />
            </TabPanel>
          </Tabs>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  dataArray: state.property.list || [],
});

export default connect(mapStateToProps)(MapSearchListScreen);
