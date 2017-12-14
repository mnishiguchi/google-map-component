import React from 'react';
import MyMapComponent from './components/MyMapComponent';
import 'semantic-ui-css/semantic.css';
import './App.css';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Google Maps Experiments</h1>
        </header>

        <MyMapComponent isMarkerShown />
      </div>
    );
  }
}

export default App;
