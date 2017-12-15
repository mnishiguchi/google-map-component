import React from 'react';
import { Marker, InfoWindow } from 'react-google-maps';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import { priceSymbolConverter } from '../utils';

// Store pairs of yelpUid to marker object.
const yelpUidMarkerMap = {};

const defaultMarkerIcon =
  'http://maps.google.com/mapfiles/ms/icons/blue-dot.png';
const hoverMarkerIcon = 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

const setMarkerIcon = (yelpUid, iconUrl) => {
  const marker = yelpUidMarkerMap[yelpUid];
  marker.state.__SECRET_MARKER_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.setIcon(iconUrl);
};

// Custom marker component.
// https://tomchentw.github.io/react-google-maps/#infowindow
const MarkerComponent = compose(
  withStateHandlers(
    () => ({
      isInfoWindowOpen: false
    }),
    {
      toggleInfoWindow: ({ isInfoWindowOpen }) => () => ({
        isInfoWindowOpen: !isInfoWindowOpen
      }),
      openInfoWindow: () => () => ({
        isInfoWindowOpen: true
      }),
      closeInfoWindow: () => () => ({
        isInfoWindowOpen: false
      })
    }
  ),
  withHandlers({
    onMouseOver: props => event => {
      setMarkerIcon(props.yelpUid, hoverMarkerIcon);
      props.openInfoWindow(event);
    },
    onMouseOut: props => event => {
      setMarkerIcon(props.yelpUid, defaultMarkerIcon);
      props.closeInfoWindow(event);
    }
  })
)(props => (
  <Marker
    ref={object => (yelpUidMarkerMap[props.yelpUid] = object)}
    position={props.position}
    onMouseOver={props.onMouseOver}
    onMouseOut={props.onMouseOut}
    icon={defaultMarkerIcon}
  >
    {props.isInfoWindowOpen && (
      <InfoWindow>
        <React.Fragment>
          <h4>{props.name}</h4>
          <p>{props.displayAddress}</p>
          <nav className="level is-mobile">
            <div className="level-left">
              <a className="level-item">
                <span className="icon is-small">
                  <i className="fa fa-heart" />
                </span>
              </a>
              <a className="level-item">
                <span className="tag is-info">
                  Rating: {props.rating} / 5.0
                </span>
              </a>
              <a className="level-item">
                <span className="tag is-info">
                  {priceSymbolConverter[props.price]}
                </span>
              </a>
            </div>
          </nav>
        </React.Fragment>
      </InfoWindow>
    )}
  </Marker>
));

export default MarkerComponent;
