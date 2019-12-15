import React from "react";
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faChartPie, faListOl, faMapMarkedAlt} from "@fortawesome/free-solid-svg-icons";
import {getMe} from "../../_common/utils";
import "./Nav.scss";

const Nav = ({close}) => {
  
  const {myId} = getMe();
  
  return (
    <nav className="nav">
      <section className="icon-list">
        <Link to={`/main/diary/list/${myId}`} onClick={close}>
          <div className="nav-link">
            <FontAwesomeIcon icon={faListOl}/>
            <div className="nav-name">목록으로 보기</div>
          </div>
        </Link>
        <Link to={`/main/diary/map/${myId}`} onClick={close}>
          <div className="nav-link">
            <FontAwesomeIcon icon={faMapMarkedAlt}/>
            <div className="nav-name">지도에서 보기</div>
          </div>
        </Link>
        <Link to={`/main/diary/stats/${myId}/monthly`} onClick={close}>
          <div className="nav-link">
            <FontAwesomeIcon icon={faChartPie}/>
            <div className="nav-name">통계로 보기</div>
          </div>
        </Link>
      </section>
    </nav>
  );
};

export default Nav;
