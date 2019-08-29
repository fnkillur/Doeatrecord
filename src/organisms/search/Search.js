import React from "react";
import {Route} from "react-router-dom";
import queryString from "query-string";
import SearchBar from "../../components/SearchBar";
import Map from "../../components/Map";
import Record from "./Record";
import "./Search.scss"

const Search = ({history, location: {search}, match: {url}}) => {
  
  const {keyword} = queryString.parse(search);
  const searchKeyword = keyword => history.push(`${url}?keyword=${keyword}`);
  
  return (
    <main className="record">
      <section className="title-box">
        <span className="title">
          <strong>오늘 맛있는거 먹었다!</strong>
        </span>
      </section>
      <SearchBar keyword={keyword} searchKeyword={searchKeyword}/>
      <section className="map-box">
        <Route exact path={url} render={props => <Map {...props} searchText={keyword}/>}/>
        <Route path={`${url}/record/:id`} component={Record}/>
      </section>
    </main>
  );
};

export default Search;