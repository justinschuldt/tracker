import React from 'react';
import logo from './logo.svg';
import './App.less';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Switch,
} from "react-router-dom";

import { Button } from 'antd';

import Landing from './containers/Landing'
import New from './containers/New'
import CategoryDetails from './containers/CategoryDetails'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button type="primary">Ant design Button!</Button>
        <Router>
          <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Landing</Link>
            </li>
            <li>
              <Link to="/new">new</Link>
            </li>
            <li>
              <Link to="/category/7">Category</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/category/:id" component={CategoryDetails} />
          <Route path="/new">
             <New />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </div>
        </Router>
      </header>
    </div>
  );
}

export default App;
