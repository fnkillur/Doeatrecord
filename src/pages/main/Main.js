import React, {Fragment, useContext} from "react";
import {Redirect, Route} from "react-router-dom";
import {SearchContext} from "../../contexts/SearchContext";
import {getMe} from "../../_common/utils";
import Header from "./Header";
import Search from "../../organisms/search/Search";
import Diary from "../../organisms/diary/Diary";
import Me from "../../organisms/auth/Me";
import Nav from "./Nav";
import Footer from "./Footer";
import SwipeBar from "../../components/SwipeBar";
import "./Main.scss";

const Main = ({history, match: {url}}) => {
  
  const {token} = getMe();
  if (!token) {
    alert('로그인 해주세요!');
    history.push('/login');
  }
  
  const {state: {searchList}} = useContext(SearchContext);
  
  return (
    <Fragment>
      <Header/>
      <Route exact path={`${url}`} render={() => <Redirect to={`${url}/search`}/>}/>
      <Route path={`${url}/search`} component={Search}/>
      <Route path={`${url}/diary`} component={Diary}/>
      <Route path={`${url}/me`} component={Me}/>
      {
        searchList.length ? <SwipeBar/> : <Nav/>
      }
      <Footer/>
    </Fragment>
  );
};

export default Main;