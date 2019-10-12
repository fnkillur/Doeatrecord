import React, {Fragment} from "react";
import {Redirect, Route} from "react-router-dom";
import queryString from "query-string";
import {getMe} from "../../_common/utils";
import Header from "./Header";
import Search from "../search/Search";
import Record from "../record/Record";
import Diary from "../diary/Diary";
import Me from "../auth/Me";
import Footer from "./Footer";
import "./Main.scss";

const Main = ({history, match: {url}, location: {pathname, search}}) => {
  
  const me = getMe();
  if (!me) {
    location.href = '/login';
  }
  
  const {myId} = me;
  
  const searchRecords = (type, keyword) => history.push(`/main/diary/${type}/${myId}${keyword ? `?keyword=${keyword}` : ''}`);
  const {keyword} = queryString.parse(search);
  
  return (
    <Fragment>
      <Header/>
      <Route exact path={`${url}`} render={() => <Redirect to={`${url}/search`}/>}/>
      <Route path={`${url}/search`} component={Search}/>
      <Route path={`${url}/record/:placeId`} component={Record}/>
      <Route path={`${url}/diary`} component={Diary}/>
      <Route path={`${url}/me`} component={Me}/>
      <Footer
        isShow={pathname.includes('diary')}
        type={pathname.split('/')[3]}
        keyword={keyword}
        searchRecords={searchRecords}
      />
    </Fragment>
  );
};

export default Main;