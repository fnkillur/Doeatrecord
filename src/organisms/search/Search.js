import React from "react";
import "./Search.scss"
import {Route, Switch} from "react-router-dom";
import queryString from "query-string";
import SearchBar from "../../components/SearchBar";
import Map from "../../components/Map";
import Detail from "./Detail";

const Search = ({history, location: {search}}) => {
  
  const {keyword} = queryString.parse(search);
  const searchKeyword = keyword => history.push(`/search?keyword=${keyword}`);
  const viewDetail = id => history.push(`/search/detail/${id}`);
  
  return (
    <main className="record">
      <section className="title-box">
        <span className="title">
          <strong>오늘 맛있는거 먹었다!</strong>
        </span>
      </section>
      <SearchBar keyword={keyword} searchKeyword={searchKeyword}/>
      <section className="map-box">
        <Switch>
          <Route exact path="/search" render={props => <Map {...props} searchText={keyword} viewDetail={viewDetail}/>}/>
          <Route exact path="/search/detail/:id" component={Detail}/>
        </Switch>
      </section>
    </main>
  );
};

export default Search;