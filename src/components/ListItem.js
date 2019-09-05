import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCalendarAlt, faCreditCard, faListOl, faUtensils} from "@fortawesome/free-solid-svg-icons";
import "./ListItem.scss";

const ListItem = ({record: {placeName, category, visitedDate, menus = [], money}}) => {
	
	return (
		<article className="list-item">
			<section className="card-title"><h3>{placeName}</h3></section>
			<div className="card-inner">
				<section className="card-summary">
					<div className="description">
						<FontAwesomeIcon icon={faUtensils}/>{category}
					</div>
					<div className="description">
						<FontAwesomeIcon icon={faListOl}/>{menus.join(', ') || '메뉴 뭐먹었더라...'}
					</div>
					<div className="description">
						<FontAwesomeIcon icon={faCreditCard}/>{money} 원
					</div>
					<div className="description">
						<FontAwesomeIcon icon={faCalendarAlt}/>{visitedDate}
					</div>
				</section>
				<section className="card-btn">
				</section>
			</div>
		</article>
	);
};

export default ListItem;