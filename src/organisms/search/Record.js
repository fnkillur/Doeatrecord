import React, {useContext, useEffect, useRef, useState} from "react";
import "./Record.scss";
import {gql} from "apollo-boost";
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
      category
      money
      menus
      created
    }
  }
`;

const Record = () => {
	
	const {state: {list, selectedIndex}} = useContext(SearchListContext);
	console.log(list[selectedIndex]);
	const {place_name, address_name, road_address_name, phone, place_url, id: placeId, category_name: category, x, y} = list[selectedIndex];
	
	const [menus, setMenus] = useState('');
	const [money, setMoney] = useState('');
	
	const [isRecord, setIsRecord] = useState(false);
	const [createRecord] = useMutation(CREATE_RECORD);
	
	useEffect(() => {
		const record = async () => {
			const {id: userId} = getMe();
			const {data} = await createRecord({
				variables: {
					input: {
						userId,
						placeId,
						category,
						x,
						y,
						money,
						menus: menus.split(',')
					}
				}
			});
			setPlace({});
			console.log(data.createRecord);
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
			<div className="field sub-title">
				<span><strong>오늘 여기서 ...</strong></span>
			</div>
			<div className="field">
				<FontAwesomeIcon icon={faListOl}/>
				<input type="text" className="input menu" placeholder="특히 이런걸 먹었고"
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