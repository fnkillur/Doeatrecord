import React from 'react';
import './Main.scss';
import {Link} from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import SearchBar from '../../components/SearchBar';
import Map from '../record/Map';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faListOl, faMapMarkedAlt, faChartPie} from '@fortawesome/free-solid-svg-icons'

const Main = () => {
  return (
    <section className="main">
      <Header/>
      <main>
        <section className="title-box">
          <span className="title"><strong>오늘 맛있는거 먹었다!</strong></span>
        </section>
        <section className="search">
          <SearchBar
            placeholder="어떤 가게를 방문하셨나요?"
          />
          <div className="search-map">
            <Map/>
          </div>
        </section>
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
      </main>
      <Footer/>
    </section>
  );
};

export default Main;