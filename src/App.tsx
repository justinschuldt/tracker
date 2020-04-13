import React from 'react';
import './App.less';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";

import Landing from './containers/Landing'
import SeriesDetails from './containers/SeriesDetails'

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/series-details/:id" >
            <SeriesDetails />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
  );
}

export default App;
