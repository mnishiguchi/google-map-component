import { combineReducers } from 'redux';
// react-router-redux 5.x for use with react-router 4.x
import { routerReducer } from 'react-router-redux';
import { SELECT_SEARCH_LIST_ITEM } from './constants';

const mapReducer = (state = { selectedItemId: null }, action) => {
  switch (action.type) {
    case SELECT_SEARCH_LIST_ITEM:
      return {
        ...state,
        selectedItemId: action.payload.id
      };
    default:
      return state;
  }
};

const propertyReducer = (state = {}, action) => state;

export default combineReducers({
  router: routerReducer,
  map: mapReducer,
  property: propertyReducer
});
