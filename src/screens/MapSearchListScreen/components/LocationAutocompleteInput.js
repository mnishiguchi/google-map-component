import React, { Component } from 'react';
import axios from 'axios';
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
          isOpen
        }) => {
          return (
            <div style={{ padding: '1.5rem' }}>
              <input
                className="input"
                {...getInputProps({
                  onChange: event => {
                    const value = event.target.value;
                    if (!value) return;

                    debounce(
                      axios
                        .get(`${baseEndpoint}${value}`)
                        .then(response => {
                          const items = [...response.data];
                          this.setState({ items });
                        })
                        .catch(error => {
                          console.log(error);
                        }),
                      400
                    );
                  }
                })}
              />
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
