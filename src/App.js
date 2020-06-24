import React from 'react';
import './App.css';
import topStories from './container/topStories/topStories'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={topStories}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
