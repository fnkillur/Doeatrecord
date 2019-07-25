import React from 'react';
import './Nav.scss';
import {Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faChartPie, faListOl, faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons';

const Nav = () => {
  return (
    <section className="diary">
      <div className="title-box">
        <span className="sub-title">그동안 얼마나 먹은거야...?</span>
      </div>
      <div className="diary-icons">
        <div className="view-icon">
          <Link to="/list">
            <FontAwesomeIcon icon={faListOl}/>
            <div className="view-name">목록으로 보기</div>
          </Link>
        </div>
        <div className="view-icon">
          <Link to="/map">
            <FontAwesomeIcon icon={faMapMarkedAlt}/>
            <div className="view-name">지도로 보기</div>
          </Link>
        </div>
        <div className="view-icon">
          <Link to="/stats">
            <FontAwesomeIcon icon={faChartPie}/>
            <div className="view-name">통계로 보기</div>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Nav;