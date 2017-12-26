import React from 'react';
import { connect } from 'react-redux';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Polyline
} from 'react-google-maps';
import { compose, withProps } from 'recompose';
import MarkerComponent from './MarkerComponent';
import DirectionDetails from './DirectionDetails';
import UsStatePolygonComponent from './UsStatePolygonComponent';
import decodeCoordinates from '../../../utils/decodeCoordinates';
import { clearDirection } from '../../../actions';

const googleMapURL =
  'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA9CucPXf8WfL7K4HiMZzw5D8mXwrnX2XI';

const defaultMapProps = {
  defaultCenter: { lat: 38.8977, lng: -77.0365 },
  defaultZoom: 7
};

// Configure the map here.
// https://tomchentw.github.io/react-google-maps/
const MapComponent = compose(
  withProps({
    googleMapURL,
    loadingElement: <div style={{ height: '100%' }} />,
    containerElement: <div style={{ height: '100%' }} />,
    mapElement: <div style={{ height: '100%' }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => {
  const { direction } = props;
  const encodedCoordinates =
    direction.data && direction.data.length > 0
      ? direction.data[0].overviewPolyline.points
      : '';
  const polylinePath = decodeCoordinates(encodedCoordinates);

  return (
    <GoogleMap {...defaultMapProps}>
      {props.isMarkerShown && (
        <div style={{ position: 'relative' }}>
          <UsStatePolygonComponent usStateName="district of columbia" />
          <UsStatePolygonComponent usStateName="maryland" />
          <UsStatePolygonComponent usStateName="virginia" />

          {polylinePath && (
            <Polyline
              path={polylinePath}
              options={{
                path: {},
                geodesic: true,
                strokeColor: '#FF0000',
                strokeOpacity: 1.0,
                strokeWeight: 2
              }}
            />
          )}

          {props.dataArray.map(place => (
            <MarkerComponent
              key={place.yelpUid}
              position={{
                lat: Number(place.latitude),
                lng: Number(place.longitude)
              }}
              {...place}
            />
          ))}

          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0
            }}
          >
            <DirectionDetails
              direction={direction}
              onClose={() => props.dispatch(clearDirection())}
            />
          </div>
        </div>
      )}
    </GoogleMap>
  );
});

const mapStateToProps = state => ({
  direction: state.map.direction
});

export default connect(mapStateToProps)(MapComponent);
