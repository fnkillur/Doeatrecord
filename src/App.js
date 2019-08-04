import React from "react";
import "./App.scss";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Login from "./pages/auth/Login";
import Me from "./pages/auth/Me";
import Main from "./pages/main/Main";
import {hot} from "react-hot-loader";

const App = () => (
  <Router>
    <Route exact path="/" component={() => <Redirect to="/login"/>}/>
    <Route path="/login" component={Login}/>
    <Route path="/me" component={Me}/>
    <Route path="/record" component={Main}/>
    <Route path="/diary" component={Main}/>
  </Router>
);

export default hot(module)(App);