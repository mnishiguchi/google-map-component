import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';
import { compose, withProps } from 'recompose';
import MarkerComponent from './MarkerComponent';
import UsStatePolygonComponent from './UsStatePolygonComponent';

const googleMapURL =
  'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA9CucPXf8WfL7K4HiMZzw5D8mXwrnX2XI';
const defaultCenter = { lat: 38.8977, lng: -77.0365 };
const defaultZoom = 6;

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
  return (
    <GoogleMap defaultZoom={defaultZoom} defaultCenter={defaultCenter}>
      {props.isMarkerShown && (
        <React.Fragment>
          <UsStatePolygonComponent usStateName={'district of columbia'} />
          <UsStatePolygonComponent usStateName={'maryland'} />
          <UsStatePolygonComponent usStateName={'virginia'} />

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
        </React.Fragment>
      )}
    </GoogleMap>
  );
});

export default MapComponent;
