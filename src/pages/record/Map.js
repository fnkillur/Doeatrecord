import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import './Map.scss';

let map, allPlaces;

const Map = ({searchText}) => {
  
  useEffect(() => {
    const container = document.getElementById('map');
    map = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    });
  }, []);
  
  useEffect(() => {
    if (!searchText)
      return;
    
    allPlaces = new kakao.maps.services.Places();
    allPlaces.keywordSearch(searchText, (searchPlaces, status, pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        let bounds = new kakao.maps.LatLngBounds();
        
        for (let i = 0; i < searchPlaces.length; i++) {
          displayMarker(searchPlaces[i]);
          bounds.extend(new kakao.maps.LatLng(searchPlaces[i].y, searchPlaces[i].x));
        }
        
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds);
      }
    });
  }, [searchText]);
  
  const displayMarker = place => {
    let infoWindow = new kakao.maps.InfoWindow({zIndex: 1});
    const marker = new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(place.y, place.x)
    });
    
    kakao.maps.event.addListener(marker, 'click', function () {
      infoWindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
      infoWindow.open(map, marker);
    });
  };
  
  return <div id="map" className="map"/>;
};

Map.prototype = {
  searchText: PropTypes.string
};

export default Map;