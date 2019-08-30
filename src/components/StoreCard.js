import React from "react";
import {faLink, faMapMarkerAlt, faPhoneAlt, faUtensils} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./StoreCard.scss";

const StoreCard = ({store, viewDetail}) => {
	const {place_name, category_name, phone, road_address_name, address_name, place_url, id} = store;
	
	return (
		<article className="store-card">
			<section className="card-title"><h3>{place_name}</h3></section>
			<div className="card-inner">
				<section className="card-summary">
					<div className="description">
						<FontAwesomeIcon icon={faUtensils}/>{category_name}
					</div>
					<div className="description">
						<FontAwesomeIcon icon={faPhoneAlt}/>{phone || '전화번호 없음'}
					</div>
					<div className="description">
						<FontAwesomeIcon icon={faMapMarkerAlt}/>{road_address_name || address_name}
					</div>
					<div className="description">
						<FontAwesomeIcon icon={faLink}/><a href={place_url}>카카오맵 링크</a>
					</div>
				</section>
				<section className="card-btn">
					<button type="button" className="btn btn-view-detail" onClick={() => viewDetail(id)}>기록하러 가기</button>
				</section>
			</div>
		</article>
	);
};

export default StoreCard;