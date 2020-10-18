import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Registration from './pages/registration';

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'; 

const App = () => (
  <Router> 
    <Switch>
      <Route path="/" exact component={Registration}/> 
    </Switch>
  </Router>
); 

ReactDOM.render(<App/>, document.getElementById('root')); 
