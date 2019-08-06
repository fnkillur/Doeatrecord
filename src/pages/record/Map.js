import React, {useRef, useState, useEffect} from "react";
import PropTypes from "prop-types";
import "./Map.scss";

const places = new kakao.maps.services.Places();

const Map = ({searchText}) => {
  const mapEl = useRef(null);
  const [map, setMap] = useState({});
  
  useEffect(() => {
    setMap(new kakao.maps.Map(mapEl.current, {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    }));
  }, [mapEl.current]);
  
  useEffect(() => {
    const displayMarker = place => {
      
      const infoWindow = new kakao.maps.InfoWindow({
        zIndex: 1,
        removable: true,
        content: `
          <div style="padding:2px;font-size:12px;">${place.place_name}</div>
          <button type="button" class="btn">기록하기</button>
        `
      });
      
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });
      
      kakao.maps.event.addListener(marker, "click", function () {
        infoWindow.open(map, marker);
      });
    };
    
    places.keywordSearch(searchText, (searchPlaces, status) => {
      if (status === kakao.maps.services.Status.OK) {
        
        let bounds = new kakao.maps.LatLngBounds();
        
        for (let i = 0; i < searchPlaces.length; i++) {
          displayMarker(searchPlaces[i]);
          bounds.extend(new kakao.maps.LatLng(searchPlaces[i].y, searchPlaces[i].x));
        }
        
        map.setBounds(bounds);
      }
    });
  }, [searchText]);
  
  return <div id="map" className="map" ref={mapEl}/>;
};

Map.prototype = {
  searchText: PropTypes.string
};

export default Map;