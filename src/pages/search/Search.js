import React, {useEffect, useState} from "react";
import queryString from "query-string";
import SearchBar from "../../components/SearchBar";
import Map from "../../components/Map";
import SearchList from "../../organisms/search/SearchList";
import "./Search.scss"

const Search = ({history, location: {search}, match: {url}}) => {
  
  const {keyword = ''} = queryString.parse(search);
  
  const [list, setList] = useState([]);
  const [isSearched, setIsSearched] = useState(false);
  const [selectedIndex, setIndex] = useState(-1);
  
  const searchKeyword = keyword => {
    setIsSearched(false);
    history.push(`${url}${keyword ? `?keyword=${keyword}` : ''}`);
  };
  
  const viewDetail = placeId => history.push(`/main/record/${placeId}`);
  
  useEffect(() => {
    
    if (keyword && isSearched) {
      return;
    }
    
    const searchCallback = (searchPlaces, status) => {
      
      if (status !== kakao.maps.services.Status.OK) {
        return;
      }
      
      setList(searchPlaces.map(
        ({
           id,
           place_name,
           category_name,
           road_address_name,
           address_name,
           place_url,
           x,
           y
         }) => ({
          placeId: id,
          placeName: place_name,
          category: category_name,
          address: road_address_name || address_name,
          url: place_url,
          x,
          y
        })
      ));
      setIndex(0);
      setIsSearched(true);
    };
    
    const hasOption = keyword.indexOf(' ') === -1;
    
    if (keyword) {
      places.keywordSearch(keyword, searchCallback, hasOption && {
        location: map.getCenter(),
        bounds: map.getBounds()
      });
    } else {
      setList([]);
      setIndex(-1);
    }
    
  }, [keyword, isSearched]);
  
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
          list={list}
          selectedIndex={selectedIndex}
          setIndex={setIndex}
        />
        <SearchList
          viewDetail={viewDetail}
          list={list}
          selectedIndex={selectedIndex}
          setIndex={setIndex}
        />
      </section>
    </main>
  );
};

export default Search;