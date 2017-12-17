import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createHashHistory';
import reducers from './reducers';

const logger = createLogger({
  collapsed: true
});

const initialState = {};

export default createStore(
  reducers,
  initialState,
  applyMiddleware(thunk, logger, routerMiddleware(createHistory()))
);
