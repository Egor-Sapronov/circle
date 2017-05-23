import React, { Component } from 'react';
import './App.css';
import Circle from './circle';

const steps = [
  {
    label: '1',
    color: 'light'
  }, {
    label: '1',
    color: 'gray'
  }, {
    label: '1',
    color: 'orange'
  }, {
    label: '1',
    color: 'tomato'
  }, {
    label: '1',
    color: 'black'
  }
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <Circle steps={steps} />
      </div>
    );
  }
}

export default App;
