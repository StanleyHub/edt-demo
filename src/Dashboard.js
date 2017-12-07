import React, {Component} from 'react';

import DashboardGrid from './DashboardGrid';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <div className="EditHeader wrapper py1 flex align-center">
            <span className="EditHeader-title" style={{paddingLeft: 8}}>You are editing a dashboard</span>
          </div>
        </header>
        <div className="wrapper">
          <DashboardGrid/>
        </div>
      </div>
    );
  }
}

export default App;
