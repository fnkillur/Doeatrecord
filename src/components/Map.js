import React, {useEffect, useState} from "react";
import {CLEAR_PLACE_LIST, SELECT_PLACE, SET_SEARCH_LIST, TOGGLE_SEARCHED} from "../reducers/SearchListReducer";
import "./Map.scss";

let map;
const places = new kakao.maps.services.Places();

const Map = ({keyword, list, selectedIndex, isSearched, dispatch}) => {
  
  const [mapInfo, setMapInfo] = useState({location: '', bounds: ''});
  
  useEffect(() => {
    map = new kakao.maps.Map(document.getElementById('map'), {
      center: new kakao.maps.LatLng(37.288701, 127.051681),
      level: 4
    });
    
    setMapInfo({
      location: map.getCenter(),
      bounds: map.getBounds()
    });
    
    kakao.maps.event.addListener(map, 'dragend', () => setMapInfo({
      location: map.getCenter(),
      bounds: map.getBounds()
    }));
    kakao.maps.event.addListener(map, 'zoom_changed', () => setMapInfo({
      location: map.getCenter(),
      bounds: map.getBounds()
    }));
    
    return () => dispatch([CLEAR_PLACE_LIST]);
  }, []);
  
  useEffect(() => {
    
    if (isSearched) {
      return;
    }
    
    list.map(({marker}) => marker.setMap(null));
    dispatch([CLEAR_PLACE_LIST]);
    
    const searchCallback = (searchPlaces, status) => {
      
      dispatch([TOGGLE_SEARCHED, true]);
      
      if (status !== kakao.maps.services.Status.OK) {
        return;
      }
      
      const searchList = searchPlaces.map((
        {id, place_name, category_name, road_address_name, address_name, place_url, x, y}
      ) => {
        const position = new kakao.maps.LatLng(y, x);
        const marker = new kakao.maps.Marker({map, position});
        kakao.maps.event.addListener(marker, "click", () => dispatch([SELECT_PLACE, index]));
        
        return {
          placeId: id,
          placeName: place_name,
          category: category_name,
          address: road_address_name || address_name,
          url: place_url,
          x, y,
          marker
        };
      });
      
      dispatch([SET_SEARCH_LIST, searchList]);
    };
    
    const hasOption = keyword.indexOf(' ') === -1;
    
    keyword && places.keywordSearch(keyword, searchCallback, hasOption && mapInfo);
    
  }, [keyword, isSearched]);
  
  useEffect(() => {
    if (selectedIndex < 0) {
      return;
    }
    
    const {y, x} = list[selectedIndex];
    map.setCenter(new kakao.maps.LatLng(y, x));
    
  }, [selectedIndex]);
  
  return <div id="map" className="map"/>;
};

export default Map;