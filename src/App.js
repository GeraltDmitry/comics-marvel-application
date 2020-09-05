import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './components/Header';
import Home from './components/Home';
import Comic from './components/Comic';
import Hero from './components/Hero';
import HeroesContainer from './containers/HeroesContainer/HeroesContainer';
import ComicsContainer from './containers/HeroesContainer/ComicsContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/comics">Comics</Link>
            </li>
            <li>
              <Link to="/heroes">Heroes</Link>
            </li>
          </ul>

          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/comics">
              <ComicsContainer />
            </Route>
            <Route path="/heroes">
              <HeroesContainer />
            </Route>
            <Route path="/comic/:comicId">
              {(props) => <Comic {...props} />}
            </Route>
            <Route path="/hero/:heroId">
              {(props) => <Hero {...props} />}
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
