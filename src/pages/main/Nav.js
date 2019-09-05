import React from "react";
import "./Nav.scss";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartPie, faListOl, faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons";

const Nav = () => (
	<nav className="nav">
		<span className="title"><strong>그동안 얼마나 먹은거야...?</strong></span>
		<section className="icon-list">
			<div className="view-icon">
				<Link to="/main/diary/list">
					<FontAwesomeIcon icon={faListOl}/>
				</Link>
			</div>
			<div className="view-icon">
				<Link to="/main/diary/map">
					<FontAwesomeIcon icon={faMapMarkedAlt}/>
				</Link>
			</div>
			<div className="view-icon">
				<Link to="/main/diary/stats">
					<FontAwesomeIcon icon={faChartPie}/>
				</Link>
			</div>
		</section>
	</nav>
);

export default Nav;