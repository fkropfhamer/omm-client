import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import About from "./components/About";
import CreateTemplate from "./components/template/CreateTemplate";
import EditMeme from "./components/meme/EditMeme";
import Home from "./components/Home";
import MemeOverview from "./components/meme/MemeOverview";
import MemeSlideShow from "./components/meme/MemeSlideShow";
import Navbar from "./components/Navbar";
import ShowMeme from "./components/meme/ShowMeme";
import ShowTemplate from "./components/template/ShowTemplate";
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route
          path="/template/create"
          render={(props) => <CreateTemplate {...props} />}
        />
        <Route path="/meme/slideshow">
          <MemeSlideShow />
        </Route>
        <Route path="/meme/overview">
          <MemeOverview />
        </Route>
        <Route
            path="/meme/edit/:url"
            render={(props) => <EditMeme {...props}/>}/>
        <Route
          path="/meme/show/:id"
          render={(props) => <ShowMeme {...props} />}
        />
        <Route
          path="/template/show/:id"
          render={(props) => <ShowTemplate {...props} />}
        />
        <Route path="/login" render={props => <Login {...props} />} />
        <Route path="/register" render={props => <Register {...props} />} />
        <Route path="/profile/:jwt" render={props => <Profile {...props} />} />
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
