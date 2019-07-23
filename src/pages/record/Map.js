import React, {useEffect} from 'react';
import './Map.scss';

let map;

const Map = () => {
  
  useEffect(() => {
    const container = document.getElementById('map');
    map = new kakao.maps.Map(container, {
      center: new kakao.maps.LatLng(33.450701, 126.570667),
      level: 3
    });
  }, []);
  
  return <div id="map" className="map"/>;
};

export default Map;