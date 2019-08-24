import React, {useContext, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {SearchContext} from "../contexts/SearchContext";
import {SET_SEARCH_LIST} from "../reducers/SearchReducer";
import "./Map.scss";

const places = new kakao.maps.services.Places();

const Map = ({searchText, viewDetail}) => {
  const mapEl = useRef(null);
  const markers = useRef([]);
  const {dispatch} = useContext(SearchContext);
  
  useEffect(() => {
    window.map = new kakao.maps.Map(mapEl.current, {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    });
  }, [mapEl.current]);
  
  useEffect(() => {
    const search = () => places.keywordSearch(searchText, (searchPlaces, status) => {
      if (status !== kakao.maps.services.Status.OK) {
        return;
      }
  
      dispatch([SET_SEARCH_LIST, searchPlaces]);
      
      let bounds = new kakao.maps.LatLngBounds();
  
      const {map} = window;
      markers.current = searchPlaces.reduce((markers, place) => {
        const {y, x, id} = place;
    
        const marker = new kakao.maps.Marker({
          map,
          position: new kakao.maps.LatLng(y, x)
        });
    
        kakao.maps.event.addListener(marker, "click", function () {
        });
    
        bounds.extend(new kakao.maps.LatLng(y, x));
    
        markers.push(marker);
        return markers;
      }, []);
  
      map.setBounds(bounds, 500, 50, 0, 50);
    });
    
    const initMap = () => {
      const {map} = window;
      markers.current = markers.current.map(marker => {
        marker.setMap(null);
        return null;
      });
      map.setLevel(3);
      map.setCenter(new kakao.maps.LatLng(33.450701, 126.570667));
    };
    
    searchText ? search() : initMap();
  }, [searchText]);
  
  return <div id="map" className="map" ref={mapEl}/>;
};

Map.prototype = {
  searchText: PropTypes.string,
  viewDetail: PropTypes.func
};

export default Map;