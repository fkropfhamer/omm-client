import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import './App.css';
import About from './components/About';
import CreateTemplate from './components/CreateTemplate';
import EditMeme from './components/EditMeme';
import Home from './components/Home';
import MemeOverview from './components/MemeOverview';
import MemeSlideShow from './components/MemeSlideShow';
import Navbar from './components/Navbar';
import ShowMeme from './components/ShowMeme';
import ShowTemplate from './components/ShowTemplate';

function App() {
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route path="/about"><About /></Route>
        <Route path="/template/create" render={(props) => <CreateTemplate {...props} />}/>
        <Route path="/meme/slideshow"><MemeSlideShow/></Route>
        <Route path="/meme/overview"><MemeOverview/></Route>
        <Route path="/meme/edit/:id" render={(props) => <EditMeme {...props}/>}/>
        <Route path="/meme/show/:id" render={(props) => <ShowMeme {...props}/>}/>
        <Route path="/template/show/:id" render={(props) => <ShowTemplate {...props} />} />
        <Route path="/">
          <Home/>
        </Route>
      </Switch>
    </Router>
  )
}

export default App;
