import React from 'react';
import { Polygon } from 'react-google-maps';

const PolygonComponent = ({ path }) => {
  const polygonOptions = {
    strokeColor: '#074',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#074',
    fillOpacity: 0.35
  };

  return <Polygon paths={path} options={polygonOptions} />;
};

export default PolygonComponent;
