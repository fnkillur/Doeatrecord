import React, {useContext, useState} from "react";
import queryString from "query-string";
import SearchBar from "../../components/SearchBar";
import Map from "../../components/Map";
import {SearchListContext} from "../../contexts/SearchListContext";
import SearchList from "../../organisms/search/SearchList";
import "./Search.scss"

const Search = ({history, location: {search}, match: {url}}) => {
  
  const [isSearched, setIsSearched] = useState(false);
  
  const {keyword} = queryString.parse(search);
  const searchKeyword = keyword => {
    setIsSearched(false);
    history.push(`${url}${keyword ? `?keyword=${keyword}` : ''}`);
  };
  
  const viewDetail = placeId => history.push(`/main/record/${placeId}`);
  
  return (
    <main className="search">
      <section className="search-title-box">
        <span className="search-title">
          <strong>오늘 맛있는거 먹었다!</strong>
        </span>
      </section>
      <SearchBar
        keyword={keyword}
        searchKeyword={searchKeyword}
        placeholder="어떤 가게를 방문하셨나요?"
      />
      <section className="map-box">
        <Map searchText={keyword} isSearched={isSearched} setIsSearched={setIsSearched}/>
        <SearchList viewDetail={viewDetail}/>
      </section>
    </main>
  );
};

export default Search;