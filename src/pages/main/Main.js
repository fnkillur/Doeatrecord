import React, {Fragment} from "react";
import {Route, Switch} from "react-router-dom";
import "./Main.scss";
import {getMe} from "../../_common/utils";
import Header from "./Header";
import Search from "../../organisms/search/Search";
import Diary from "../../organisms/diary/Diary";
import Me from "../../organisms/auth/Me";
import Nav from "./Nav";
import Footer from "./Footer";

const Main = ({history}) => {
  
  const {token} = getMe();
  if (!token) {
    alert('로그인 해주세요!');
    history.push('/login');
  }
  
  return (
    <Fragment>
      <Header/>
      <Switch>
        <Route path="/search" component={Search}/>
        <Route path="/diary" component={Diary}/>
        <Route path="/me" component={Me}/>
      </Switch>
      <Nav/>
      <Footer/>
    </Fragment>
  );
};

export default Main;