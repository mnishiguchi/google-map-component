import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

// react router v4
import { HashRouter, Switch, Route } from 'react-router-dom';

// CSS libraries
import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';

// Service worker
import registerServiceWorker from './registerServiceWorker';

// Global styles
import './index.css';

// Store
import store from './store';

// Screens
import Layout from './layouts/Layout';
import MapSearchListScreen from './screens/MapSearchListScreen';
import AboutScreen from './screens/AboutScreen';
import NoMatchScreen from './screens/NoMatchScreen';

// Data
import usStates from './data/usStates';

// Load global data.
window.App = window.App || {};
window.App.usStates = usStates;

// Root with router
const Root = () => (
  <Provider store={store}>
    <HashRouter>
      <Layout>
        <Switch>
          <Route exact path="/" component={MapSearchListScreen} />
          <Route path="/about" component={AboutScreen} />
          <Route component={NoMatchScreen} />
        </Switch>
      </Layout>
    </HashRouter>
  </Provider>
);

// Bootstrap the Root node.
ReactDOM.render(<Root />, document.getElementById('root'));

registerServiceWorker();
