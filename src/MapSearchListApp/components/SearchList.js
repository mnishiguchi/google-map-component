import React from 'react';
import SearchListItem from './SearchListItem';

const SearchList = ({ dataArray }) => (
  <ul>
    {dataArray.map(entry => {
      return (
        <li key={entry.yelpUid}>
          <SearchListItem {...entry} />
        </li>
      );
    })}
  </ul>
);

export default SearchList;
