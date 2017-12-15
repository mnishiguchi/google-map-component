import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import { compose, withStateHandlers } from 'recompose';

// Custom marker component.
// https://tomchentw.github.io/react-google-maps/#infowindow
const MarkerComponent = compose(
  withStateHandlers(
    () => ({
      isOpen: false
    }),
    {
      toggleInfoWindow: ({ isOpen }) => () => ({
        isOpen: !isOpen
      }),
      openInfoWindow: () => () => ({
        isOpen: true
      }),
      closeInfoWindow: () => () => ({
        isOpen: false
      })
    }
  )
)(props => (
  <Marker
    position={props.position}
    onMouseOver={props.openInfoWindow}
    onMouseOut={props.closeInfoWindow}
  >
    {props.isOpen && (
      <InfoWindow>
        <React.Fragment>
          <h4>{props.name}</h4>
          <p>{props.displayAddress}</p>
        </React.Fragment>
      </InfoWindow>
    )}
  </Marker>
));

export default MarkerComponent;
