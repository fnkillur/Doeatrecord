import React from "react";
import moment from "moment";
import classNames from "classnames";
import {faCalendarAlt, faCreditCard, faListOl} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {convertMoney} from "../_common/utils";
import "./Place.scss";

const Place = ({place, viewDetail}) => {
  
  const {isModify, placeId, placeName, category, address, url, x, y, visitedDate, menus = [], money} = place;
  
  const record = () => {
    sessionStorage.setItem("place", JSON.stringify({
      placeId,
      placeName,
      category,
      address,
      url,
      x,
      y
    }));
    viewDetail(placeId);
  };
  
  return (
    <article className={classNames("place", {"swipe-card": viewDetail})}>
      <div className="place-inner">
        <section className="place-desc place-header">
          <span className="place-title"><a href={url}><strong>{placeName}</strong></a></span>
          <span className="place-category">{category.slice(category.indexOf('>') + 1)}</span>
        </section>
        <section className="place-desc">
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
          !isModify && visitedDate && (
            <>
              <section className="place-desc">
                <FontAwesomeIcon icon={faListOl}/>
                {menus.join(',')}
              </section>
              <section className="place-desc place-more-info">
                <div>
                  <FontAwesomeIcon icon={faCalendarAlt}/>
                  {moment(visitedDate).format('M월 D일')}
                </div>
                <div>
                  <FontAwesomeIcon icon={faCreditCard}/>
                  {convertMoney(money)}원
                </div>
              </section>
            </>
          )
        }
      </div>
    </article>
  );
};

export default Place;