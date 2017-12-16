import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import registerServiceWorker from './registerServiceWorker';
import MapSearchListApp from './MapSearchListApp';
import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import './index.css';

// Pick random 20 items out of 3000+.
const dataArray = _.shuffle(window.App.data).slice(0, 20);

ReactDOM.render(
  <MapSearchListApp dataArray={dataArray} />,
  document.getElementById('root')
);

registerServiceWorker();
