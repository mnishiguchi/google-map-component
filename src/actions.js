import { SELECT_SEARCH_LIST_ITEM, SET_PROPERTY_LIST } from './constants';
import { json as requestJson } from 'd3-request';
import _ from 'lodash';

export const selectSearchListItem = id => {
  return {
    type: SELECT_SEARCH_LIST_ITEM,
    payload: { id }
  };
};

export const setPropertyList = propertyList => {
  return {
    type: SET_PROPERTY_LIST,
    payload: { propertyList }
  };
};

// TODO: Get data from remote server
export const fetchPropertyList = () => dispatch => {
  requestJson('data/properties.json', (error, response) => {
    if (!error) {
      // Pick random 20 items.
      const properties = _.shuffle(response).slice(0, 20);
      dispatch(setPropertyList(properties));
    }
  });
};