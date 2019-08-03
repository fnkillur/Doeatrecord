import React, {useState} from "react";
import "./App.scss";
import {BrowserRouter as Router, Route, Redirect} from "react-router-dom";
import {hot} from "react-hot-loader";
import {UserProvider} from "./contexts/UserContext";
import Login from "./pages/auth/Login";
import Main from "./pages/main/Main";

const App = () => {
  const [user, setUser] = useState({
    id: null,
    nickname: null,
    token: null
  });
  
  return (
    <UserProvider value={{user, setUser}}>
      <Router>
        <Route exact path="/" component={() => <Redirect to="/login"/>}/>
        <Route path="/login" component={Login}/>
        <Route path="/main" component={Main}/>
      </Router>
    </UserProvider>
  );
};

export default hot(module)(App);