import React, {useContext, useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {SearchListContext} from "../contexts/SearchListContext";
import {CLEAR_PLACE_LIST, SELECT_PLACE, SET_SEARCH_LIST} from "../reducers/SearchListReducer";
import "./Map.scss";

let map;
const places = new kakao.maps.services.Places();

const Map = ({searchText, isSearched, setIsSearched}) => {
  
  const markers = useRef([]);
  const {state: {list, selectedIndex}, dispatch} = useContext(SearchListContext);
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
    
    markers.current.map(marker => marker.setMap(null));
    markers.current = [];
    
    const searchCallback = (searchPlaces, status) => {
      
      setIsSearched(true);
      
      !searchPlaces.length && dispatch([CLEAR_PLACE_LIST]);
      
      if (status !== kakao.maps.services.Status.OK) {
        return;
      }
      
      let bounds = new kakao.maps.LatLngBounds();
      
      markers.current = searchPlaces.reduce((markers, {y, x}, index) => {
        const position = new kakao.maps.LatLng(y, x);
        
        const marker = new kakao.maps.Marker({map, position});
        kakao.maps.event.addListener(marker, "click", () => {
          map.setCenter(position);
          dispatch([SELECT_PLACE, index]);
        });
        
        bounds.extend(position);
        markers.push(marker);
        
        return markers;
      }, []);
      
      map.setBounds(bounds);
      
      const searchList = searchPlaces
        .map((
          {
            id,
            place_name,
            category_name,
            road_address_name,
            address_name,
            place_url,
            x,
            y
          }
        ) => (
          {
            placeId: id,
            placeName: place_name,
            category: category_name,
            address: road_address_name || address_name,
            url: place_url,
            x,
            y
          }));
      
      dispatch([SET_SEARCH_LIST, searchList]);
    };
    
    const initMap = () => {
      map.setLevel(4);
      map.setCenter(new kakao.maps.LatLng(37.288701, 127.051681));
      
      dispatch([CLEAR_PLACE_LIST]);
    };
    
    const {location, bounds} = mapInfo;
    
    searchText ? places.keywordSearch(searchText, searchCallback, searchText.indexOf(' ') === -1 && {location, bounds}) : initMap();
    
  }, [searchText, isSearched]);
  
  useEffect(() => {
    if (selectedIndex < 0) {
      return;
    }
    
    const {y, x} = list[selectedIndex];
    map.setLevel(4);
    map.setCenter(new kakao.maps.LatLng(y, x));
    
  }, [selectedIndex]);
  
  return <div id="map" className="map"/>;
};

Map.prototype = {
  searchText: PropTypes.string
};

export default Map;