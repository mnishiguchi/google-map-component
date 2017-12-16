import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import { HashRouter, Switch, Route } from 'react-router-dom';

// Service worker
import registerServiceWorker from './registerServiceWorker';

// Global styles
import 'font-awesome/css/font-awesome.min.css';
import 'bulma/css/bulma.css';
import './index.css';

// Screens
import Layout from './Layout';
import MapSearchListScreen from './screens/MapSearchListScreen';
import AboutScreen from './screens/AboutScreen';
import NoMatchScreen from './screens/NoMatchScreen';

// Data
// Pick random 20 items out of 3000+.
const dataArray = _.shuffle(window.App.data).slice(0, 20);

// Root with router
const Root = () => (
  <HashRouter>
    <Layout>
      <Switch>
        <Route
          exact
          path="/"
          render={() => <MapSearchListScreen dataArray={dataArray} />}
        />
        <Route path="/about" component={AboutScreen} />
        <Route component={NoMatchScreen}/>
      </Switch>
    </Layout>
  </HashRouter>
);

ReactDOM.render(<Root />, document.getElementById('root'));

registerServiceWorker();
