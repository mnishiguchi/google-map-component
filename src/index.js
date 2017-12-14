import React from 'react';
import ReactDOM from 'react-dom';
import SearchListApp from './SearchListApp';
import registerServiceWorker from './registerServiceWorker';
import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import './index.css';

ReactDOM.render(<SearchListApp />, document.getElementById('root'));
registerServiceWorker();
