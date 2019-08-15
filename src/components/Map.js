import React, {useEffect, useRef, useContext} from "react";
import PropTypes from "prop-types";
import "./Map.scss";
import {SearchContext} from "../contexts/SearchContext";

const places = new kakao.maps.services.Places();

const Map = ({searchText, viewDetail}) => {
  const mapEl = useRef(null);
  const {setPlace} = useContext(SearchContext);
  
  useEffect(() => {
    window.map = new kakao.maps.Map(mapEl.current, {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    });
  }, [mapEl.current]);
  
  useEffect(() => {
    searchText && places.keywordSearch(searchText, (searchPlaces, status) => {
      
      if (status === kakao.maps.services.Status.OK) {
        let bounds = new kakao.maps.LatLngBounds();
        
        searchPlaces.map(place => {
          const {y, x, id} = place;
          const {map} = window;
          
          const marker = new kakao.maps.Marker({
            map,
            position: new kakao.maps.LatLng(y, x)
          });
          
          kakao.maps.event.addListener(marker, "click", function () {
            setPlace(place);
            viewDetail(id);
          });
          
          bounds.extend(new kakao.maps.LatLng(y, x));
        });
        
        map.setBounds(bounds, 500, 50, 0, 50);
      }
    });
  }, [searchText]);
  
  return <div id="map" className="map" ref={mapEl}/>;
};

Map.prototype = {
  searchText: PropTypes.string,
  viewDetail: PropTypes.func
};

export default Map;