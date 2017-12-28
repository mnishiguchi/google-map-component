import React from 'react';
import { connect } from 'react-redux';
import { AutoSizer, List } from 'react-virtualized';
import SearchListItem from './SearchListItem';

const findScrollToIndex = (dataArray, selectedItemId) => {
  return dataArray.findIndex(
    dataEntry => (dataEntry && dataEntry.yelpUid) === selectedItemId
  );
};

class SearchList extends React.PureComponent {
  render = () => {
    const { dataArray, selectedItemId } = this.props;

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
            scrollToIndex={findScrollToIndex(dataArray, selectedItemId)}
          />
        )}
      </AutoSizer>
    );
  };
}

const mapStateToProps = state => {
  return {
    selectedItemId: state.map.selectedItemId
  };
};

export default connect(mapStateToProps)(SearchList);
