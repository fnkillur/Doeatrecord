import React from "react";
import "./Header.scss";
import {getMe} from "../../_common/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const Header = () => {
	const {nickname} = getMe();
	
	return (
		<header className="header">
			<Link to="/search">
				<FontAwesomeIcon icon={faEdit}/>
				<strong>  Do Eat, Record!</strong>
			</Link>
			<Link to="/me">
				<strong>{nickname}</strong>
			</Link>
		</header>
	);
};

export default Header;