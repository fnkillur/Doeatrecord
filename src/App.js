import React from "react";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from "@apollo/react-hooks";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {hot} from "react-hot-loader";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Main from "./pages/main/Main";
import Error from "./components/Error";

window.map = '';
window.places = new kakao.maps.services.Places();

const client = new ApolloClient({
  uri: 'http://api.doeatrecord.com/graphql'
  // uri: 'http://localhost:4000/graphql'
});

const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/login"/>}/>
        <Route path="/login" component={Login}/>
        <Route path="/register" component={Register}/>
        <Route path="/main" component={Main}/>
        <Route component={Error}/>
      </Switch>
    </Router>
  </ApolloProvider>
);

export default hot(module)(App);