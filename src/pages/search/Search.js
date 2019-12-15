import React, {useEffect, useState} from "react";
import queryString from "query-string";
import SearchBar from "../../components/SearchBar";
import KakaoMap from "../../components/KakaoMap";
import SearchList from "../../organisms/search/SearchList";
import "./Search.scss"

const Search = ({history, location: {search}, match: {url}}) => {
  const [page, setPage] = useState(1);
  const [placeList, setPlaceList] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  
  const {keyword = ''} = queryString.parse(search);
  
  const searchKeyword = keyword => history.push(`${url}${keyword ? `?keyword=${keyword}` : ''}`);
  
  useEffect(() => {
    // 초기화
    const removeData = () => {
      setSelectedIndex(0);
      setPlaceList([]);
      setMarkers([]);
    };
    
    try {
      keyword ?
        places.keywordSearch(
          keyword,
          results => {
            let searchedMarkers = [];
            const searchedPlaces = results.map((place) => {
              const {id, place_name, category_name, road_address_name, address_name, place_url, y, x} = place;
              // 중복이면 추가하지 않음
              if (placeList.findIndex(({placeId}) => placeId === id) !== -1) {
                return null;
              }
              
              const position = new kakao.maps.LatLng(y, x);
              
              // 마커 설정
              const marker = new kakao.maps.Marker({map, position});
              searchedMarkers.push({marker});
              
              // 변수명 변경
              return {
                placeId: id,
                placeName: place_name,
                category: category_name,
                address: road_address_name || address_name,
                url: place_url,
                ...place
              };
            });
            
            setPlaceList(placeList.concat(searchedPlaces.filter(place => place)));
            const addedMarkers = markers.concat(searchedMarkers)
              .map(({marker}, index) => {
                kakao.maps.event.addListener(marker, "click", function () {
                  setSelectedIndex(index);
                });
                return {marker};
              });
            setMarkers(addedMarkers);
          },
          {
            location: map.getCenter(),
            sort: 'distance',
            size: 5,
            page
          }
        )
        :
        removeData();
    } catch (error) {
      console.error(error);
    }
  }, [keyword, page]);
  
  return (
    <main className="search">
      <section className="search-title">
        <span>검색하기</span>
      </section>
      <SearchBar
        keyword={keyword}
        searchKeyword={searchKeyword}
        placeholder="어떤 가게를 방문하셨나요?"
      />
      <section className="map-box">
        {
          keyword && (
            <button className="btn-research" onClick={() => setPage(page >= 45 ? page : page + 1)}>
              검색 결과 더보기
            </button>
          )
        }
        <KakaoMap
          placeList={placeList}
          markers={markers}
          selectedIndex={selectedIndex}
        />
        <SearchList
          startSlide={selectedIndex}
          setSelectedIndex={setSelectedIndex}
          placeList={placeList}
          goToRecord={placeId => history.push(`/main/record/${placeId}`)}
        />
      </section>
    </main>
  );
};

export default Search;
