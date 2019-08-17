import React from "react";
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from "@apollo/react-hooks";
import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom";
import {hot} from "react-hot-loader";
import {SearchProvider} from "./contexts/SearchContext";
import Login from "./pages/auth/Login";
import Main from "./pages/main/Main";
import Error from "./components/Error";

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
});

const App = () => (
  <ApolloProvider client={client}>
    <SearchProvider>
      <Router>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/login"/>}/>
          <Route path="/login" component={Login}/>
          <Route path="/main" component={Main}/>
          <Route component={Error}/>
        </Switch>
      </Router>
    </SearchProvider>
  </ApolloProvider>
);

export default hot(module)(App);