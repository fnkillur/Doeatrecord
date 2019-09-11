import React, {useContext} from "react";
import queryString from "query-string";
import SearchBar from "../../components/SearchBar";
import Map from "../../components/Map";
import "./Search.scss"
import SearchList from "./SearchList";
import {SearchListContext} from "../../contexts/SearchListContext";

const Search = ({history, location: {search}, match: {url}}) => {
  
  const {keyword} = queryString.parse(search);
  const searchKeyword = keyword => history.push(`${url}?keyword=${keyword}`);
  const cleanKeyword = () => history.push(url);
  const {state: {isShowList}} = useContext(SearchListContext);
  const viewDetail = placeId => history.push(`/main/record/${placeId}`);
  
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
        {
          isShowList && <SearchList viewDetail={viewDetail}/>
        }
      </section>
    </main>
  );
};

export default Search;