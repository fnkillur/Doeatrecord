import React from "react";
import "./App.scss";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import Login from "./pages/auth/Login";
import Main from "./pages/main/Main";
import {hot} from "react-hot-loader";

const App = () => (
	<Router>
		<Route exact path="/" component={() => <Redirect to="/login"/>}/>
		<Route path="/login" component={Login}/>
		<Route path="/record" component={Main}/>
		<Route path="/diary" component={Main}/>
		<Route path="/me" component={Main}/>
	</Router>
);

export default hot(module)(App);