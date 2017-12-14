import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import MapSearchListApp from './MapSearchListApp';
import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import './index.css';

ReactDOM.render(
  <MapSearchListApp dataArray={window.App.data} />,
  document.getElementById('root')
);
registerServiceWorker();
