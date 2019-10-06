import React, {useEffect, useState} from "react";
import "./Map.scss";

const Map = ({list, selectedIndex = -1, setIndex, isRanking = false}) => {
  
  const [markers, setMarkers] = useState([]);
  
  useEffect(() => {
    map = new kakao.maps.Map(document.getElementById('map'), {
      center: new kakao.maps.LatLng(37.288701, 127.051681),
      level: 5
    });
  }, []);
  
  useEffect(() => {
    markers.map(({marker, overlay}) => {
      marker.setMap(null);
      overlay.setMap(null);
    });
    
    const temp = list.map(({placeName, count, url, y, x}, index) => {
      const position = new kakao.maps.LatLng(y, x);
      const marker = new kakao.maps.Marker({map, position});
      const content = `
        <div class="ranking-overlay">
          <div class="ranking-overlay-field"><a href="${url}">${placeName}</a></div>
          <div class="ranking-overlay-field">${count}회 방문</div>
        </div>
      `;
      const overlay = new kakao.maps.CustomOverlay({content, position});
      kakao.maps.event.addListener(marker, "click", () => {
        setIndex(index);
      });
      
      return {marker, overlay};
    });
    
    setMarkers(temp);
    
  }, [list]);
  
  useEffect(() => {
    if (!list.length || selectedIndex < 0) {
      return;
    }
    
    const {y, x} = list[selectedIndex];
    map.setCenter(new kakao.maps.LatLng(y, x));
    
    if (isRanking) {
      markers.map(({overlay}) => overlay.setMap(null));
      markers[selectedIndex].overlay.setMap(map);
    }
    
  }, [selectedIndex]);
  
  return <div id="map" className="map"/>;
};

export default Map;