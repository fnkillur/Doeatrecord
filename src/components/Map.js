import React, {useContext, useEffect, useRef} from "react";
import PropTypes from "prop-types";
import {SearchListContext} from "../contexts/SearchListContext";
import {HIDE_SEARCH_LIST, SELECT_PLACE, SET_SEARCH_LIST} from "../reducers/SearchListReducer";
import "./Map.scss";

let map;
const places = new kakao.maps.services.Places();

const Map = ({searchText}) => {
	
	const markers = useRef([]);
	const {state: {list, selectedIndex, isShowList}, dispatch} = useContext(SearchListContext);
	
	useEffect(() => {
		map = new kakao.maps.Map(document.getElementById('map'), {
			center: new kakao.maps.LatLng(33.450701, 126.570667),
			level: 3
		});
		
		return () => dispatch([HIDE_SEARCH_LIST]);
	}, []);
	
	useEffect(() => {
		const search = () => places.keywordSearch(searchText, (searchPlaces, status) => {
			
			if (status !== kakao.maps.services.Status.OK) {
				return;
			}
			
			let bounds = new kakao.maps.LatLngBounds();
			
			markers.current = searchPlaces.reduce((markers, place, index) => {
				
				const {y, x} = place;
				const position = new kakao.maps.LatLng(y, x);
				
				const marker = new kakao.maps.Marker({map, position});
				
				kakao.maps.event.addListener(marker, "click", function () {
					map.setCenter(position);
					dispatch([SELECT_PLACE, index]);
				});
				
				bounds.extend(new kakao.maps.LatLng(y, x));
				
				markers.push(marker);
				return markers;
			}, []);
			
			map.setBounds(bounds, 500, 50, 0, 50);
			
			dispatch([SET_SEARCH_LIST, searchPlaces]);
		});
		
		const initMap = () => {
			markers.current.map(marker => {
				marker.setMap(null);
			});
			markers.current = [];
			
			map.setLevel(3);
			map.setCenter(new kakao.maps.LatLng(33.450701, 126.570667));
			
			dispatch([HIDE_SEARCH_LIST]);
		};
		
		searchText ? search() : initMap();
	}, [searchText]);
	
	useEffect(() => {
		if (!isShowList) {
			return;
		}
		
		const {y, x} = list[selectedIndex];
		map.setCenter(new kakao.maps.LatLng(y, x));
	}, [selectedIndex]);
	
	return <div id="map" className="map"/>;
};

Map.prototype = {
	searchText: PropTypes.string
};

export default Map;