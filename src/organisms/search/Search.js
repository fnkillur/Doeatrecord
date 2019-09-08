import React from "react";
import queryString from "query-string";
import SearchBar from "../../components/SearchBar";
import Map from "../../components/Map";
import "./Search.scss"

const Search = ({history, location: {search}, match: {url}}) => {
  
  const {keyword} = queryString.parse(search);
  const searchKeyword = keyword => history.push(`${url}?keyword=${keyword}`);
  const cleanKeyword = () => history.push(url);
  
  return (
    <main className="search">
      <section className="title-box">
        <span className="title">
          <strong>오늘 맛있는거 먹었다!</strong>
        </span>
      </section>
      <SearchBar
        keyword={keyword}
        searchKeyword={searchKeyword}
        cleanKeyword={cleanKeyword}
      />
      <section className="map-box">
        <Map searchText={keyword}/>
      </section>
    </main>
  );
};

export default Search;