import React from 'react';
import { connect } from 'react-redux';
import { Marker, InfoWindow } from 'react-google-maps';
import { compose, withStateHandlers, withHandlers } from 'recompose';
import { selectSearchListItem } from '../../actions';
import priceSymbolConverter from '../../utils/priceSymbolConverter';

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
      // Local state
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
      const isSelected = props.yelpUid === props.selectedItemId;

      // Prevent the icon from getting back to default for selected item.
      !isSelected && setMarkerIcon(props.yelpUid, defaultMarkerIcon);
      props.closeInfoWindow(event);
    },
    onClick: props => event => {
      // Pin the InfoWindow.
      props.dispatch(selectSearchListItem(props.yelpUid));
    },
    onCloseInfoWindow: props => event => {
      setMarkerIcon(props.yelpUid, defaultMarkerIcon);
      props.dispatch(selectSearchListItem(null));
    }
  })
)(props => {
  const isSelected = props.yelpUid === props.selectedItemId;

  return (
    <Marker
      ref={object => (yelpUidMarkerMap[props.yelpUid] = object)}
      position={props.position}
      onMouseOver={props.onMouseOver}
      onMouseOut={props.onMouseOut}
      onClick={props.onClick}
      icon={isSelected ? hoverMarkerIcon : defaultMarkerIcon}
    >
      {(props.isInfoWindowOpen || isSelected) && (
        <InfoWindow
          defaultOptions={{ disableAutoPan: true }}
          onCloseClick={props.onCloseInfoWindow}
        >
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
  );
});

const mapStateToProps = state => {
  return {
    selectedItemId: state.map.selectedItemId
  };
};

export default connect(mapStateToProps)(MarkerComponent);
