import React, {Fragment} from "react";
import {Route, Redirect} from "react-router-dom";
import "./Main.scss";
import {getMe} from "../../_common/utils";
import Header from "./Header";
import Search from "../../organisms/search/Search";
import Diary from "../../organisms/diary/Diary";
import Me from "../../organisms/auth/Me";
import Nav from "./Nav";
import Footer from "./Footer";

const Main = ({history, match: {url}}) => {
  
  const {token} = getMe();
  if (!token) {
    alert('로그인 해주세요!');
    history.push('/login');
  }
  
  return (
    <Fragment>
      <Header/>
      <Route exact path={`${url}`} render={() => <Redirect to={`${url}/search`}/>}/>
      <Route path={`${url}/search`} component={Search}/>
      <Route path={`${url}/diary`} component={Diary}/>
      <Route path={`${url}/me`} component={Me}/>
      <Nav/>
      <Footer/>
    </Fragment>
  );
};

export default Main;