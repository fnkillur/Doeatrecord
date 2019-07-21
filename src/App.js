import 'core-js/stable';
import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {hot} from "react-hot-loader";
import './App.scss';
import Login from './pages/auth/Login';
import Main from './pages/main/Main';

const App = () => (
  <Router>
    <Route exact path="/" component={Login}/>
    <Route path="/main" component={Main}/>
  </Router>
);

export default hot(module)(App);