import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartPie, faListOl, faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons";
import "./Nav.scss";

const Nav = ({close}) => (
  <nav className="nav">
    <span className="title"><strong>그동안 얼마나 먹은거야...?</strong></span>
    <section className="icon-list">
      <Link to="/main/diary/list" onClick={close}>
        <div className="nav-link">
          <FontAwesomeIcon icon={faListOl}/>
          <div className="nav-name">목록으로 보기</div>
        </div>
      </Link>
      <Link to="/main/diary/map" onClick={close}>
        <div className="nav-link">
          <FontAwesomeIcon icon={faMapMarkedAlt}/>
          <div className="nav-name">지도에서 보기</div>
        </div>
      </Link>
      <Link to="/main/diary/stats" onClick={close}>
        <div className="nav-link">
          <FontAwesomeIcon icon={faChartPie}/>
          <div className="nav-name">통계로 보기</div>
        </div>
      </Link>
    </section>
  </nav>
);

export default Nav;