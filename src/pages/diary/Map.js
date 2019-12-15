import React, {useEffect, useState} from "react";
import {useLazyQuery, useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {ClipLoader} from "react-spinners";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedo} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import KakaoMap from "../../components/KakaoMap";
import "./Map.scss";

const makeOverlay = ({url, placeName, count, score}) => `
  <div class="ranking-overlay">
    <div class="ranking-overlay-field"><a href="${url}">${placeName}</a></div>
    <div class="ranking-overlay-field">${count}회 방문</div>
    ${score ? `<div class="ranking-overlay-field">${score}점</div>` : ''}
  </div>
`;

const GET_RECORDS_BY_MAP = gql`
  query ($userId: String!, $xMin: String!, $xMax: String!, $yMin: String!, $yMax: String!, $keyword: String) {
    mapRecords(userId: $userId, xMin: $xMin, xMax: $xMax, yMin: $yMin, yMax: $yMax, keyword: $keyword) {
      _id
      placeName
      count
      url
      x
      y
      score
    }
  }
`;

const GET_MY_INFO = gql`
  query ($userId: String!) {
    myFriends(userId: $userId) {
      userId
      nickname
    }
  }
`;

const Map = ({match: {params: {userId}}, location: {search: keyword = ''}}) => {
  const [placeList, setPlaceList] = useState([]);
  const [markers, setMarkers] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMoved, setIsMoved] = useState(false);
  
  const [friends, setFriends] = useState([]);
  
  const {data: myInfo} = useQuery(GET_MY_INFO, {variables: {userId}});
  const [getRecords, {loading, data}] = useLazyQuery(GET_RECORDS_BY_MAP);
  
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
    const recordedMarkers = placeList.map(({y, x, ...rest}) => {
      const position = new kakao.maps.LatLng(y, x);
      
      // 마커 설정
      const marker = new kakao.maps.Marker({map, position});
      
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
    setSelectedIndex(0);
  }, [placeList]);
  
  useEffect(() => {
    friends.map(({userId}) => {
      // 친구의 가게 정보 조회 후 placeList 에 추가
      // 만약 같은 가게를 갔을 경우에 대한 로직 필요
    });
  }, [friends]);
  
  if (loading) {
    return <ClipLoader size={50} color="white"/>;
  }
  
  return (
    <main className="counted-map">
      <section className="counted-map-header">
        <Select
          isMulti
          placeholder="친구를 선택해보세요."
          closeMenuOnSelect={false}
          styles={{
            option: styles => ({...styles, color: '#011627'}),
            menu: styles => ({...styles, zIndex: 1000,})
          }}
          options={myInfo && myInfo.myFriends && myInfo.myFriends.map(({userId, nickname}) => ({
            label: nickname,
            value: userId
          }))}
          onChange={selectedList => setFriends(selectedList || [])}
        />
      </section>
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
