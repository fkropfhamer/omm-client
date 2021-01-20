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
import Login from './components/Login';
import Register from './components/Register';
import MemeOverview from './components/MemeOverview';
import MemeSlideShow from './components/MemeSlideShow';
import ShowMeme from './components/ShowMeme';
import ShowTemplate from './components/ShowTemplate';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/create-meme" render={(props) => <CreateMeme {...props} />}/>
        <Route path="/meme-slideshow"><MemeSlideShow/></Route>
        <Route path="/meme-overview"><MemeOverview/></Route>
        <Route path="/edit-meme/:id" render={(props) => <EditMeme {...props}/>}/>
        <Route path="/show-meme/:id" render={(props) => <ShowMeme {...props}/>}/>
        <Route path="/show-template/:id" render={(props) => <ShowTemplate {...props} />} />
        <Route path="/login"><Login/></Route>
        <Route path="/register"><Register/></Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
