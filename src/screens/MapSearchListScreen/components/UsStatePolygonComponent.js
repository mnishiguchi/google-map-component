import React from 'react';
import { Polygon } from 'react-google-maps';

// Find info on a US state from usState geojson and return formatted polygon paths.
// https://developers.google.com/maps/documentation/javascript/examples/polygon-simple
const buildPolygonPaths = (usStates, usStateRegex) => {
  const usState = usStates.find(usState =>
    usStateRegex.test(usState.properties.name)
  );

  if (!usState) return;

  // Nesting levels are differnt between MultiPolygon and Polygon.
  switch (usState.geometry.type) {
    case 'MultiPolygon':
      return usState.geometry.coordinates.map(polygons =>
        polygons.map(polygon =>
          polygon.map(coordinate => ({
            lat: Number(coordinate[1]),
            lng: Number(coordinate[0])
          }))
        )
      );
    case 'Polygon':
      return usState.geometry.coordinates.map(polygon =>
        polygon.map(coordinate => ({
          lat: Number(coordinate[1]),
          lng: Number(coordinate[0])
        }))
      );
    default:
      return [];
  }
};

const UsStatePolygonComponent = ({ usStateName }) => {
  const polygonOptions = {
    strokeColor: '#074',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#074',
    fillOpacity: 0.35
  };

  return (
    <React.Fragment>
      {buildPolygonPaths(window.App.usStates, new RegExp(usStateName, 'i')).map(
        (paths, i) => (
          <Polygon
            paths={paths}
            options={polygonOptions}
            key={`usStateName_${i}`}
          />
        )
      )}
    </React.Fragment>
  );
};

export default UsStatePolygonComponent;
