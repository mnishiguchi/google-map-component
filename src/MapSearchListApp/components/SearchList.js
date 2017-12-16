import React from 'react';
import { AutoSizer, List } from 'react-virtualized';
import SearchListItem from './SearchListItem';

class SearchList extends React.PureComponent {
  render = () => {
    const { dataArray } = this.props;

    return (
      <AutoSizer>
        {({ width, height }) => (
          <List
            width={width}
            height={height}
            overscanRowCount={10}
            rowCount={dataArray.length}
            rowHeight={80}
            rowRenderer={({ index, key, style }) => (
              <div key={key} style={style}>
                <SearchListItem {...dataArray[index]} />
              </div>
            )}
            noRowsRenderer={() => <div>No places</div>}
            scrollToIndex={this.scrollToIndex}
          />
        )}
      </AutoSizer>
    );
  };
}

export default SearchList;
