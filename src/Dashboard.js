import React, { Component } from 'react';

import DashboardGrid from './DashboardGrid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header></header>
        <div className="wrapper">
            <DashboardGrid/>
        </div>
      </div>
    );
  }
}

export default App;
