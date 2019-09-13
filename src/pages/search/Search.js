import React, {useContext} from "react";
import queryString from "query-string";
import SearchBar from "../../components/SearchBar";
import Map from "../../components/Map";
import {SearchListContext} from "../../contexts/SearchListContext";
import SearchList from "../../organisms/search/SearchList";
import "./Search.scss"

const Search = ({history, location: {search}, match: {url}}) => {
  
  const {keyword} = queryString.parse(search);
  const searchKeyword = keyword => history.push(`${url}${keyword ? `?keyword=${keyword}` : ''}`);
  
  const {state: {isShowList}} = useContext(SearchListContext);
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
        <Map searchText={keyword}/>
        {
          isShowList && <SearchList viewDetail={viewDetail}/>
        }
      </section>
    </main>
  );
};

export default Search;