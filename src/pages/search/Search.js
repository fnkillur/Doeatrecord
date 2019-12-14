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
  
  const searchKeyword = keyword => history.push(`${url}${keyword ? `?keyword=${keyword}&page=${page}` : ''}`);
  const viewDetail = placeId => history.push(`/main/record/${placeId}`);
  
  useEffect(() => {
    // 초기화
    const removeData = () => {
      setSelectedIndex(0);
      setPlaceList([]);
      setMarkers([]);
    };
    
    keyword ?
      places.keywordSearch(
        keyword,
        (results, status) => {
          if (status !== kakao.maps.services.Status.OK) {
            return;
          }
          
          let bounds = new kakao.maps.LatLngBounds();
          let searchedMarkers = [];
          const searchedPlaces = results.map((place, index) => {
            const {id, place_name, category_name, road_address_name, address_name, place_url, y, x} = place;
            const position = new kakao.maps.LatLng(y, x);
            
            // 마커 설정
            const marker = new kakao.maps.Marker({map, position});
            searchedMarkers.push({marker});
            kakao.maps.event.addListener(marker, "click", function () {
              setSelectedIndex(index);
            });
            
            // 장소가 보이도록 지도 반경 확대
            bounds.extend(position);
            
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
          
          setPlaceList(searchedPlaces);
          setMarkers(searchedMarkers);
          setSelectedIndex(0);
          
          // 지도 반경 설정
          map.setBounds(bounds);
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
          keyword && <button className="btn-research" onClick={() => setPage(page + 1)}>다음 목록 검색 ({page} 페이지)</button>
        }
        <KakaoMap
          placeList={placeList}
          markers={markers}
          selectedIndex={selectedIndex}
        />
        <SearchList
          viewDetail={viewDetail}
          placeList={placeList}
          selectedIndex={selectedIndex}
          setIndex={setSelectedIndex}
        />
      </section>
    </main>
  );
};

export default Search;
