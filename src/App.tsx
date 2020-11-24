import React from 'react';
import './App.css';
import {apiEndpointUrl} from './constants'

function App() {
  function click() {
    console.log('dfas')
    fetch(apiEndpointUrl).then(r => r.json()).then(j => console.log(j));
  }


  return (
    <div className="App">
      <button onClick={() => click()} >Click me!</button>
    </div>
  );
}

export default App;
