import React from 'react';
import ReactDOM from 'react-dom';
import MapSearchListApp from './index';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MapSearchListApp />, div);
});
