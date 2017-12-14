import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from 'react-google-maps';

const defaultCenter = { lat: 38.8977, lng: -77.0365 };
const defaultZoom = 8;

// https://tomchentw.github.io/react-google-maps/
export default withScriptjs(
  withGoogleMap(props => (
    <GoogleMap defaultZoom={defaultZoom} defaultCenter={defaultCenter}>
      {props.isMarkerShown && <Marker position={defaultCenter} />}
    </GoogleMap>
  ))
);
