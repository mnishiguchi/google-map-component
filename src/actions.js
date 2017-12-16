import { SELECT_SEARCH_LIST_ITEM } from './constants';

export const selectSearchListItem = id => {
  return {
    type: SELECT_SEARCH_LIST_ITEM,
    payload: { id }
  };
};
