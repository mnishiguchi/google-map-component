import React from 'react';
import { connect } from 'react-redux';
import { priceSymbolConverter } from '../utils';
import { selectSearchListItem } from '../../../actions';

const SearchListItem = ({
  yelpUid,
  name,
  imageUrl,
  url,
  rating,
  price,
  phone,
  dispatch,
  selectedItemId
}) => {
  const isSelected = yelpUid === selectedItemId;

  return (
    <div
      className="box"
      style={Object.assign(
        {
          overflow: 'hidden',
          maxHeight: '120px',
          borderRadius: '0'
        },
        {
          background: isSelected && '#d6dfea'
        }
      )}
      onMouseOver={() => dispatch(selectSearchListItem(yelpUid))}
      onMouseOut={() => dispatch(selectSearchListItem(null))}
    >
      <article className="media">
        <div className="media-left">
          <figure
            className="image is-96x96"
            style={{ background: `no-repeat center/100% url(${imageUrl})` }}
          />
        </div>
        <div className="media-content">
          <div className="content">
            <a href={url}>
              <strong className="ellipsis">{name}</strong>
            </a>
          </div>
          <nav className="level is-mobile">
            <div className="level-left">
              <a className="level-item">
                <span className="icon is-small">
                  <i className="fa fa-heart" />
                </span>
              </a>
              <a className="level-item">
                <span className="tag is-info">Rating: {rating} / 5.0</span>
              </a>
              <a className="level-item">
                <span className="tag is-info">
                  {priceSymbolConverter[price]}
                </span>
              </a>
            </div>
          </nav>
        </div>
      </article>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    selectedItemId: state.map.selectedItemId
  };
};

export default connect(mapStateToProps)(SearchListItem);
