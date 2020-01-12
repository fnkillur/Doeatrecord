import React, {useEffect, useState} from "react";
import {useLazyQuery, useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faRedo, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import Select from "react-select";
import KakaoMap from "../../components/KakaoMap";
import "./Map.scss";
import ButtonGroup from "../../components/ButtonGroup";
import classNames from "classnames";

const makeOverlay = ({url, placeName, count, score}) => `
  <div class="ranking-overlay">
    <div class="ranking-overlay-field"><a href="${url}">${placeName}</a></div>
    <div class="ranking-overlay-field">총 방문 횟수: ${count}회</div>
    ${score ? `<div class="ranking-overlay-field">평균 평점: ${score}점</div>` : ''}
  </div>
`;

const GET_RECORDS_BY_MAP = gql`
  query ($userId: String!, $friends: [String], $xMin: String!, $xMax: String!, $yMin: String!, $yMax: String!, $viewScore: Int!, $keyword: String) {
    mapRecords(userId: $userId, friends: $friends, xMin: $xMin, xMax: $xMax, yMin: $yMin, yMax: $yMax, viewScore: $viewScore, keyword: $keyword) {
      _id
      isMine
      placeName
      count
      url
      x
      y
      score
    }
  }
`;

const GET_MY_INFO = gql`
  query ($userId: String!) {
    myFriends(userId: $userId) {
      userId
      nickname
    }
  }
`;

const Map = ({match: {params: {userId}}, location: {search: keyword = ''}}) => {
	const [placeList, setPlaceList] = useState([]);
	const [markers, setMarkers] = useState([]);
	const [selectedIndex, setSelectedIndex] = useState(-1);
	const [isMoved, setIsMoved] = useState(false);
	
	const [friends, setFriends] = useState([]);
	const [viewScore, setViewScore] = useState(0);
	
	const {data: myInfo} = useQuery(GET_MY_INFO, {variables: {userId}});
	const [getRecords, {data}] = useLazyQuery(GET_RECORDS_BY_MAP);
	
	// 별점 선택 버튼들
	const buttons = [{
		className: classNames("btn", {clicked: viewScore === 0}),
		onClick: () => setViewScore(0),
		label: '전체'
	}, {
		className: classNames("btn", {clicked: viewScore === 5}),
		onClick: () => setViewScore(5),
		label: <><FontAwesomeIcon icon={faStarHalfAlt}/>5점</>
	}, {
		className: classNames("btn", {clicked: viewScore === 4}),
		onClick: () => setViewScore(4),
		label: <><FontAwesomeIcon icon={faStarHalfAlt}/>4점</>
	}, {
		className: classNames("btn", {clicked: viewScore === 3}),
		onClick: () => setViewScore(3),
		label: <><FontAwesomeIcon icon={faStarHalfAlt}/>3점</>
	}, {
		className: classNames("btn", {clicked: viewScore === 2}),
		onClick: () => setViewScore(2),
		label: <><FontAwesomeIcon icon={faStarHalfAlt}/>2점</>
	}, {
		className: classNames("btn", {clicked: viewScore === 1}),
		onClick: () => setViewScore(1),
		label: <><FontAwesomeIcon icon={faStarHalfAlt}/>1점</>
	}];
	
	// 검색하기
	const handleSearch = () => {
		const currentBounds = map.getBounds();
		const swLatLng = currentBounds.getSouthWest();
		const neLatLng = currentBounds.getNorthEast();
		
		const xMin = swLatLng.getLng().toString();
		const xMax = neLatLng.getLng().toString();
		const yMin = swLatLng.getLat().toString();
		const yMax = neLatLng.getLat().toString();
		
		getRecords({variables: {userId, friends, xMin, xMax, yMin, yMax, viewScore, keyword}});
		setIsMoved(false);
	};
	
	// 최초 조회
	useEffect(() => {
		handleSearch();
	}, []);
	
	// 이동 이벤트 등록
	useEffect(() => {
		kakao.maps.event.addListener(map, 'center_changed', function () {
			setIsMoved(true);
		});
		return () => {
			kakao.maps.event.removeListener(map, 'center_changed', function () {
				setIsMoved(true);
			});
		}
	}, [map]);
	
	// 검색할 때마다 list 갱신
	useEffect(() => {
		if (data && data.mapRecords) {
			setPlaceList(data.mapRecords);
		}
	}, [data]);
	
	// list 가 갱신되면 marker 도 갱신
	useEffect(() => {
		const recordedMarkers = placeList.map(({y, x, isMine, ...rest}) => {
			const position = new kakao.maps.LatLng(y, x);
			// 마커 설정
			const image = {
				image: new kakao.maps.MarkerImage('http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markers_sprites2.png', new kakao.maps.Size(40, 45))
			};
			const marker = new kakao.maps.Marker({map, position, ...(!isMine && image)});
			
			// 오버레이 설정
			const content = makeOverlay({...rest});
			const overlay = new kakao.maps.CustomOverlay({content, position});
			
			return {marker, overlay};
		});
		
		// 마커 클릭 시 오버레이 보여주기
		recordedMarkers.map(({marker, overlay}) => {
			kakao.maps.event.addListener(marker, "click", function () {
				recordedMarkers.map(({overlay}) => overlay.setMap(null));
				overlay.setMap(map);
			});
		});
		
		setMarkers(recordedMarkers);
		setSelectedIndex(-1);
	}, [placeList]);
	
	// 친구나 별점 변경하면 재검색
	useEffect(() => {
		handleSearch();
	}, [friends, viewScore]);
	
	return (
		<main className="counted-map">
			<section className="counted-map-header">
				<Select
					isMulti
					placeholder="친구를 선택해보세요."
					closeMenuOnSelect={false}
					styles={{
						control: styles => ({...styles, width: '300px', color: '#fff', backgroundColor: '#011627'}),
						option: styles => ({...styles, color: '#fff', backgroundColor: '#011627'}),
						menu: styles => ({...styles, width: '300px', color: '#fff', backgroundColor: '#011627', zIndex: 1001})
					}}
					options={myInfo && myInfo.myFriends && myInfo.myFriends.map(({userId, nickname}) => ({
						label: nickname,
						value: userId
					}))}
					onChange={selectedList => {
						setFriends(selectedList ?
							selectedList.filter(({value}) => !friends.includes(value))
								.map(({value}) => value)
							:
							[]
						)
					}}
				/>
				<ButtonGroup containerClass="btn-scores" buttons={buttons}/>
			</section>
			<section className="map-box">
				{
					isMoved && (
						<button className="btn-research" onClick={handleSearch}>
							<FontAwesomeIcon icon={faRedo}/>
							<span className="label-research">이 지역에서 재검색</span>
						</button>
					)
				}
				<KakaoMap
					placeList={placeList}
					markers={markers}
					selectedIndex={selectedIndex}
				/>
			</section>
		</main>
	);
};

export default Map;
