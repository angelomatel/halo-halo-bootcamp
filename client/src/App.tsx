import React from 'react';
import './App.scss';

import UserList from './components/UserList';

function App() {
    return (
      <div className="container">
        <div className="row">
          <span>
            Halo-Halo TFT Bootcamp
          </span>
        </div>
        <div className="row">
          <span>
            Next Elimination:
          </span>
        </div>
        <div className="row">
          <div className="row align-middle text-center">
            <div className="col col-1"></div>
            <div className="col col fw-bold">PLAYER</div>
            <div className="col col-3 fw-bold">HEALTH</div>
            <div className="col col-3 fw-bold">RANK</div>
          </div>
        </div>
        <UserList/>
      </div>
    );
}

export default App;
