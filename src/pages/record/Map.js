import React, {useEffect} from "react";
import PropTypes from "prop-types";
import "./Map.scss";

let map, allPlaces;

const Map = ({searchText}) => {
  
  useEffect(() => {
    const container = document.getElementById("map");
    map = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    });
  }, []);
  
  useEffect(() => {
    const displayMarker = place => {
      let infoWindow = new kakao.maps.InfoWindow({zIndex: 1});
      const marker = new kakao.maps.Marker({
        map,
        position: new kakao.maps.LatLng(place.y, place.x)
      });
      
      kakao.maps.event.addListener(marker, "click", function () {
        infoWindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
        infoWindow.open(map, marker);
      });
    };
    
    allPlaces = new kakao.maps.services.Places();
    allPlaces.keywordSearch(searchText, (searchPlaces, status) => {
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
  
  return <div id="map" className="map"/>;
};

Map.prototype = {
  searchText: PropTypes.string
};

export default Map;