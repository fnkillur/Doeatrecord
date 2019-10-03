import React, {useReducer} from "react";
import queryString from "query-string";
import SearchListReducer, {TOGGLE_SEARCHED} from "../../reducers/SearchListReducer";
import SearchBar from "../../components/SearchBar";
import Map from "../../components/Map";
import SearchList from "../../organisms/search/SearchList";
import "./Search.scss"

const initState = {
  list: [],
  selectedIndex: -1,
  isSearched: false
};

const Search = ({history, location: {search}, match: {url}}) => {
  
  const {keyword = ''} = queryString.parse(search);
  
  const [state, dispatch] = useReducer(SearchListReducer, initState);
  const {list, selectedIndex, isSearched} = state;
  
  const searchKeyword = keyword => {
    dispatch([TOGGLE_SEARCHED, false]);
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
        <Map
          keyword={keyword}
          list={list}
          selectedIndex={selectedIndex}
          isSearched={isSearched}
          dispatch={dispatch}
        />
        <SearchList
          viewDetail={viewDetail}
          list={list}
          selectedIndex={selectedIndex}
          dispatch={dispatch}
        />
      </section>
    </main>
  );
};

export default Search;