import React from "react";
import {faCalendarAlt, faCreditCard, faListOl} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "./Place.scss";

const Place = ({store, viewDetail}) => {
  
  const {placeId, placeName, category, address, url, visitedDate, menus = [], money} = store;
  
  const record = () => {
    sessionStorage.setItem("store", JSON.stringify(store));
    viewDetail(placeId);
  };
  
  return (
    <article className="place">
      <section className="place-desc place-header">
        <span className="place-title"><strong>{placeName}</strong></span>
        <span className="place-category">{category.slice(category.indexOf('>') + 1)}</span>
      </section>
      <section className="place-desc place-address">
        {address}
      </section>
      {
        viewDetail && (
          <section className="place-desc place-swipe-card">
            <div><a href={url}>카카오맵에서 확인하기</a></div>
            <button type="button" className="btn btn-detail" onClick={record}>기록하러 가기</button>
          </section>
        )
      }
      {
        visitedDate && (
          <>
            <section className="place-desc">
              <FontAwesomeIcon icon={faListOl}/>
              {menus.join(',')}
            </section>
            <section className="place-desc">
              <FontAwesomeIcon icon={faCreditCard}/>
              {money} 원
            </section>
            <section className="place-desc">
              <FontAwesomeIcon icon={faCalendarAlt}/>
              {visitedDate}
            </section>
          </>
        )
      }
    </article>
  );
};

export default Place;