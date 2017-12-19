import {
  SELECT_SEARCH_LIST_ITEM,
  SET_PROPERTY_LIST,
  SET_DIRECTION
} from './constants';
import { json as requestJson } from 'd3-request';
import _ from 'lodash';

export const selectSearchListItem = id => {
  return {
    type: SELECT_SEARCH_LIST_ITEM,
    payload: { id }
  };
};

const setPropertyList = propertyList => {
  return {
    type: SET_PROPERTY_LIST,
    payload: { propertyList }
  };
};

// TODO: Make a rails-wabpacker app and fetch data from remote server through a custom client.
// Simulate fetching from API because client server cannot directly access third party APIs.
export const fetchPropertyList = () => dispatch => {
  requestJson('data/properties.json', (error, response) => {
    if (!error) {
      // Pick random 20 items.
      const properties = _.shuffle(response).slice(0, 20);
      dispatch(setPropertyList(properties));
    }
  });
};

const setDirection = direction => {
  return {
    type: SET_DIRECTION,
    payload: { direction }
  };
};

// TODO: Make a rails-wabpacker app and fetch data from remote server through a custom client.
// Simulate fetching from API because client server cannot directly access third party APIs.
export const fetchDirection = () => dispatch => {
  requestJson('data/direction.json', (error, response) => {
    if (!error) {
      dispatch(setDirection(response));
    }
  });
};
