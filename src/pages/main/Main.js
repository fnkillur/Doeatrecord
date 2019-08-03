import React, {Fragment, useContext} from "react";
import {Route, Switch} from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import Header from "./Header";
import Record from "../record/Record";
import Diary from "../diary/Diary";
import Footer from "./Footer";


const Main = ({history, match}) => {
  const {user: {token}} = useContext(UserContext);
  
  if (!token) {
    alert("로그인 해주세요!");
    history.push("/");
  }
  console.log(match);
  
  return (
    <Fragment>
      <Header/>
      <Switch>
        <Route path="/main/record" component={Record}/>
        <Route path="/main/diary" component={Diary}/>
      </Switch>
      <Footer/>
    </Fragment>
  );
};

export default Main;