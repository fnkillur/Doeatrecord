import React from "react";
import "./Search.scss"
import {Route} from "react-router-dom";
import queryString from "query-string";
import SearchBar from "../../components/SearchBar";
import Map from "../../components/Map";
import Record from "./Record";

const Search = ({history, location: {search}}) => {
  
  const {keyword} = queryString.parse(search);
  const searchKeyword = keyword => history.push(`/search?keyword=${keyword}`);
  const viewDetail = id => history.push(`/search/record/${id}`);
  
  return (
    <main className="record">
      <section className="title-box">
        <span className="title">
          <strong>오늘 맛있는거 먹었다!</strong>
        </span>
      </section>
      <SearchBar keyword={keyword} searchKeyword={searchKeyword}/>
      <section className="map-box">
        <Route exact path="/search" render={props => <Map {...props} searchText={keyword} viewDetail={viewDetail}/>}/>
        <Route path="/search/record/:id" component={Record}/>
      </section>
    </main>
  );
};

export default Search;