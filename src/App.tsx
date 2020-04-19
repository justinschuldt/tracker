import React from 'react';
import './App.less';
import {
  HashRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Landing from './containers/Landing'
import SeriesDetails from './containers/SeriesDetails'

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/landing" >
            <Landing />
          </Route>
          <Route path="/:id?">
            <SeriesDetails />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
