import React, { Component } from 'react';
import Downshift from 'downshift';

function debounce(fn, time) {
  let timeoutId;
  return wrapper;
  function wrapper(...args) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      timeoutId = null;
      fn(...args);
    }, time);
  }
}

const baseEndpoint = 'https://geo-apartments.herokuapp.com/v1/autocomplete?q=';

class LocationAutocompleteInput extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { items: [] };
  }

  render() {
    return (
      <Downshift
        render={({
          selectedItem,
          getInputProps,
          getItemProps,
          highlightedIndex,
          isOpen,
          clearSelection
        }) => {
          return (
            <div style={{ padding: '1.5rem' }}>
              <div className="field has-addons">
                <p className="control">
                  <input
                    ref={node => this.inputNode = node}
                    className="input"
                    placeholder="Place name"
                    {...getInputProps({
                      onChange: event => {
                        const value = event.target.value;
                        if (!value) return;

                        debounce(
                          fetch(`${baseEndpoint}${value}`)
                            .then(response => {
                              if (!response.ok) {
                                return Promise.reject(response.text().then(msg => new Error(msg)))
                              }

                              return response.json()
                            }).then(json => {
                              if (!Array.isArray(json)) return;

                              const items = [...json];
                              this.setState({ items });
                            }),
                          400
                        );
                      }
                    })}
                  />
                </p>
                <p className="control">
                  <a className="button" onClick={clearSelection}>
                    x
                  </a>
                </p>
              </div>

              {isOpen && (
                <div>
                  {this.state.items.map((item, index) => (
                    <div
                      key={index}
                      {...getItemProps({
                        item,
                        style: {
                          padding: '8px 10px',
                          backgroundColor:
                            highlightedIndex === index ? '#ccc' : '#fff',
                          fontWeight: selectedItem === item ? 'bold' : 'normal'
                        }
                      })}
                    >
                      {item}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        }}
      />
    );
  }
}

export default LocationAutocompleteInput;
