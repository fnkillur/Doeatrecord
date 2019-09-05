import React, {useContext, useEffect, useRef, useState} from "react";
import "./Record.scss";
import {gql} from "apollo-boost";
import {DatePicker} from "antd";
import "antd/dist/antd.css";
import locale from "antd/es/date-picker/locale/ko_KR";
import moment from "moment";
import {useMutation} from "@apollo/react-hooks";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCreditCard, faLink, faListOl, faMapMarkerAlt, faPhoneAlt} from "@fortawesome/free-solid-svg-icons";
import {SearchListContext} from "../../contexts/SearchListContext";
import {getMe, isNumber} from "../../_common/utils";

const CREATE_RECORD = gql`
  mutation CreateRecord($input: NewRecord!) {
    createRecord(input: $input) {
      userId
      placeId
      placeName
      category
      visitedDate
      menus
      money
      created
    }
  }
`;

const Record = ({history}) => {
	
	const {state: {list, selectedIndex}} = useContext(SearchListContext);
	const {place_name, address_name, road_address_name, phone, place_url, id: placeId, category_name: category, x, y} = list[selectedIndex];
	
	const [menus, setMenus] = useState('');
	const [money, setMoney] = useState('');
	const [visitedDate, setVisitedDate] = useState(moment().format('YYYY-MM-DD'));
	
	const [isRecord, setIsRecord] = useState(false);
	const [createRecord] = useMutation(CREATE_RECORD);
	
	useEffect(() => {
		const record = async () => {
			const {id: userId} = getMe();
			await createRecord({
				variables: {
					input: {
						userId,
						placeId,
						placeName: place_name,
						category,
						x,
						y,
						menus: menus.split(','),
						money,
						visitedDate
					}
				}
			});
			history.push('/main/diary/list');
		};
		isRecord && record();
	}, [isRecord]);
	
	const menuEl = useRef(null);
	
	useEffect(() => {
		menuEl.current.focus();
	}, [menuEl.current]);
	
	const handleMoney = ({target: {value}}) => isNumber(value) && setMoney(value ? parseInt(value, 10) : '');
	
	return (
		<article className="detail">
			<h2 className="title">{place_name}</h2>
			<div className="field">
				<FontAwesomeIcon icon={faMapMarkerAlt}/><span>{road_address_name || address_name}</span>
			</div>
			<div className="field">
				<FontAwesomeIcon icon={faPhoneAlt}/><span>{phone || '전화번호 없음'}</span>
			</div>
			<div className="field">
				<FontAwesomeIcon icon={faLink}/><a href={place_url}>카카오맵 링크</a>
			</div>
			<div className="field">
				서기 <DatePicker locale={locale} value={moment(visitedDate)}
				               onChange={(_, dateString) => setVisitedDate(dateString)}/> 에 여기서
			</div>
			<div className="field">
				<FontAwesomeIcon icon={faListOl}/>
				<input type="text" className="input menu" placeholder="이런 메뉴를 먹었고"
				       ref={menuEl}
				       value={menus} onChange={({target: {value}}) => setMenus(value)}/>
			</div>
			<div className="field">
				<FontAwesomeIcon icon={faCreditCard}/>
				<input type="text" className="input money" placeholder="돈은 이만큼 썼네?"
				       value={money} onChange={handleMoney}/>
			</div>
			<div className="field btn-box">
				<button type="button" className="btn btn-record" onClick={() => setIsRecord(true)}>기록하자!</button>
			</div>
		</article>
	);
};

export default Record;