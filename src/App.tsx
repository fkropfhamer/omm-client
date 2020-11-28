import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import CreateMeme from './components/CreateMeme';
import EditMeme from './components/EditMeme';
import Home from './components/Home';
import ShowMeme from './components/ShowMeme';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/create-meme">
          <CreateMeme />
        </Route>
        <Route path="/edit-meme/:id" render={(props) => <EditMeme {...props}/>}/>
        <Route path="/show-meme/:id" render={(props) => <ShowMeme {...props}/>}/>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
