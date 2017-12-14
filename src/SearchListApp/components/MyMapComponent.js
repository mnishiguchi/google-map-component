import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';
import { compose, withProps } from 'recompose';

const googleMapURL =
  'https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyA9CucPXf8WfL7K4HiMZzw5D8mXwrnX2XI';
const defaultCenter = { lat: 38.8977, lng: -77.0365 };
const defaultZoom = 8;

// https://tomchentw.github.io/react-google-maps/
const MyMapComponent = compose(
  withProps({
    googleMapURL,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `80vh` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={defaultZoom} defaultCenter={defaultCenter}>
    {props.isMarkerShown && <Marker position={defaultCenter} />}
  </GoogleMap>
));

export default MyMapComponent;
