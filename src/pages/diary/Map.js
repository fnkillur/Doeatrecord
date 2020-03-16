import React, {useEffect, useState} from "react";
import {useLazyQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedo} from "@fortawesome/free-solid-svg-icons";
import KakaoMap from "../../components/KakaoMap";
import "./Map.scss";

const makeOverlay = ({url, placeName, count, score}) => `
  <div class="ranking-overlay">
    <div class="ranking-overlay-field"><a href="${url}">${placeName}</a></div>
    <div class="ranking-overlay-field">총 방문 횟수: ${count}회</div>
    ${score ? `<div class="ranking-overlay-field">평균 평점: ${score}점</div>` : ''}
  </div>
`;

const GET_RECORDS_BY_MAP = gql`
  query ($userId: String!, $xMin: String!, $xMax: String!, $yMin: String!, $yMax: String!, $keyword: String) {
    mapRecords(userId: $userId, xMin: $xMin, xMax: $xMax, yMin: $yMin, yMax: $yMax, keyword: $keyword) {
      _id
      isMine
      placeName
      count
      url
      x
      y
      score
    }
  }
`;

const Map = ({match: {params: {userId}}, location: {search: keyword = ''}}) => {
  const [placeList, setPlaceList] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isMoved, setIsMoved] = useState(false);
  const [getRecords, {data}] = useLazyQuery(GET_RECORDS_BY_MAP);
  
  // 검색하기
  const handleSearch = () => {
    const currentBounds = map.getBounds();
    const swLatLng = currentBounds.getSouthWest();
    const neLatLng = currentBounds.getNorthEast();
    
    const xMin = swLatLng.getLng().toString();
    const xMax = neLatLng.getLng().toString();
    const yMin = swLatLng.getLat().toString();
    const yMax = neLatLng.getLat().toString();
    
    getRecords({variables: {userId, xMin, xMax, yMin, yMax, keyword}});
    setIsMoved(false);
  };
  
  // 최초 조회
  useEffect(() => {
    handleSearch();
  }, []);
  
  // 이동 이벤트 등록
  useEffect(() => {
    kakao.maps.event.addListener(map, 'center_changed', function () {
      setIsMoved(true);
    });
    return () => {
      kakao.maps.event.removeListener(map, 'center_changed', function () {
        setIsMoved(true);
      });
    }
  }, [map]);
  
  // 검색할 때마다 list 갱신
  useEffect(() => {
    if (data && data.mapRecords) {
      setPlaceList(data.mapRecords);
    }
  }, [data]);
  
  // list 가 갱신되면 marker 도 갱신
  useEffect(() => {
    const recordedMarkers = placeList.map(({y, x, isMine, ...rest}) => {
      const position = new kakao.maps.LatLng(y, x);
      // 마커 설정
      const image = {
        image: new kakao.maps.MarkerImage('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markers_sprites2.png', new kakao.maps.Size(40, 45))
      };
      const marker = new kakao.maps.Marker({map, position, ...(!isMine && image)});
      
      // 오버레이 설정
      const content = makeOverlay({...rest});
      const overlay = new kakao.maps.CustomOverlay({content, position});
      
      return {marker, overlay};
    });
    
    // 마커 클릭 시 오버레이 보여주기
    recordedMarkers.map(({marker, overlay}) => {
      kakao.maps.event.addListener(marker, "click", function () {
        recordedMarkers.map(({overlay}) => overlay.setMap(null));
        overlay.setMap(map);
      });
    });
    
    setMarkers(recordedMarkers);
    setSelectedIndex(-1);
  }, [placeList]);
  
  
  return (
    <main className="counted-map">
      <section className="map-box">
        {
          isMoved && (
            <button className="btn-research" onClick={handleSearch}>
              <FontAwesomeIcon icon={faRedo}/>
              <span className="label-research">이 지역에서 재검색</span>
            </button>
          )
        }
        <KakaoMap
          placeList={placeList}
          markers={markers}
          selectedIndex={selectedIndex}
        />
      </section>
    </main>
  );
};

export default Map;
