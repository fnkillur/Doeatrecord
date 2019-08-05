import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import {getMe} from "../../_common/utils";
import Header from "./Header";
import Record from "../record/Record";
import Diary from "../diary/Diary";
import Me from "../auth/Me";
import Nav from "./Nav";
import Footer from "./Footer";

const Main = ({history}) => {
  
  const {token} = getMe();
  if (!token) {
    alert("로그인 해주세요!");
    history.push("/login");
  }
  
  return (
    <Fragment>
      <Header/>
      <Switch>
        <Route path="/record" component={Record}/>
        <Route path="/diary" component={Diary}/>
        <Route path="/me" component={Me}/>
      </Switch>
      <Nav/>
      <Footer/>
    </Fragment>
  );
};

export default Main;