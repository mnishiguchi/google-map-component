import {
  SELECT_SEARCH_LIST_ITEM,
  SET_PROPERTY_LIST,
  SET_DIRECTION,
  SET_POLYGON
} from './constants';
import { json as requestJson } from 'd3-request';
import _ from 'lodash';

export const selectSearchListItem = id => ({
  type: SELECT_SEARCH_LIST_ITEM,
  payload: { id }
});

const setPropertyList = propertyList => ({
  type: SET_PROPERTY_LIST,
  payload: { propertyList }
});

// TODO: Make a rails-wabpacker app and fetch data from remote server through a custom client.
// Simulate fetching from API because client server cannot directly access third party APIs.
export const fetchPropertyList = () => dispatch => {
  requestJson('data/properties.json', (error, response) => {
    if (error) return;

    // Pick random 20 items.
    const properties = _.shuffle(response).slice(0, 20);
    dispatch(setPropertyList(properties));
  });
};

const setDirection = direction => ({
  type: SET_DIRECTION,
  payload: { direction }
});

export const clearDirection = () => setDirection(null);

export const fetchDirection = (
  { origin, destination, mode },
  callback
) => dispatch => {
  const url = `https://geo-apartments.herokuapp.com/v1/directions?origin=${origin}&destination=${destination}&mode=${mode}`;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response.json();
    })
    .then(json => {
      console.log(json);

      if (json.length < 1) return;

      const direction = { mode, data: json };
      dispatch(setDirection(direction));
    })
    .then(() => callback())
    .catch(error => new Error(error));
};

const setPolygon = polygon => ({
  type: SET_POLYGON,
  payload: { polygon }
});

export const clearPolygon = () => setPolygon(null);

export const fetchPolygon = ({ place }, callback) => dispatch => {
  const url = `https://geo-apartments.herokuapp.com/v1/polygons?q=${place}`;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw Error(response.statusText);
      }

      return response.json();
    })
    .then(json => {
      console.log(json);

      if (json.length < 1) return;

      const polygon = json;
      dispatch(setPolygon(polygon));
    })
    .then(() => callback())
    .catch(error => new Error(error));
};
