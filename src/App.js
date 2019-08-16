import React from "react";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from "@apollo/react-hooks";
import {BrowserRouter as Router, Redirect, Route} from "react-router-dom";
import {hot} from "react-hot-loader";
import {SearchProvider} from "./contexts/SearchContext";
import Login from "./pages/auth/Login";
import Main from "./pages/main/Main";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const App = () => (
  <ApolloProvider client={client}>
    <SearchProvider>
      <Router>
        <Route exact path="/" render={() => <Redirect to="/login"/>}/>
        <Route path="/login" component={Login}/>
        <Route path="/search" component={Main}/>
        <Route path="/diary" component={Main}/>
        <Route path="/me" component={Main}/>
      </Router>
    </SearchProvider>
  </ApolloProvider>
);

export default hot(module)(App);