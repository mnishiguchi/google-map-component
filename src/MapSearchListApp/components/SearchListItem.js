import React from 'react';
import './SearchListItem.css';

const priceSymbolConverter = {
  1: '$',
  2: '$$',
  3: '$$$',
  4: '$$$$'
};

const SearchListItem = ({
  yelpUid,
  name,
  imageUrl,
  url,
  rating,
  price,
  phone
}) => (
  <div className="box SearchListItem">
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
              <span className="tag is-info">Rating: {rating} / 5</span>
            </a>
            <a className="level-item">
              <span className="tag is-info">{priceSymbolConverter[price]}</span>
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
);

export default SearchListItem;
