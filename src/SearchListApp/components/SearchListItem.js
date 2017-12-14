import React from 'react';

const SearchListItem = props => (
  <div className="box SearchListItem">
    <article className="media">
      <div className="media-left">
        <figure className="image is-64x64">
          <img
            src="https://bulma.io/images/placeholders/128x128.png"
            alt="Image"
          />
        </figure>
      </div>
      <div className="media-content">
        <div className="content">
          <p>
            <strong>John Smith</strong> <small>@johnsmith</small>
          </p>
        </div>
        <nav className="level is-mobile">
          <div className="level-left">
            <a className="level-item">
              <span className="icon is-small">
                <i className="fa fa-heart" />
              </span>
            </a>
          </div>
        </nav>
      </div>
    </article>
  </div>
);

export default SearchListItem;
