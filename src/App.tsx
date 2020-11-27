import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import CreateMeme from './components/CreateMeme';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/create-meme">
          <CreateMeme />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
