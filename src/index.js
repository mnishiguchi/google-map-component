import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import _ from 'lodash';

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

// TODO: Replace this with fetching data from remote API.
const dataArray = _.shuffle(window.App.data).slice(0, 20);

// Root with router
const Root = () => (
  <Provider store={store}>
    <HashRouter>
      <Layout>
        <Switch>
          <Route
            exact
            path="/"
            render={() => <MapSearchListScreen dataArray={dataArray} />}
          />
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
