import React from "react";
import moment from "moment";
import classNames from "classnames";
import {faCalendarAlt, faCreditCard, faListOl, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Rating from "react-rating";
import {convertMoney} from "../_common/utils";
import StarEmpty from "./StarEmpty";
import StarFull from "./StarFull";
import "./Place.scss";

const Place = ({place, goToRecord, record}) => {
  const {isModify, placeName, category, address, url, visitedDate, menus = [], money, score = 0} = place;
  
  return (
    <article className={classNames("place", {"swipe-card": goToRecord})}>
      <div className="place-inner">
        <section className="place-desc place-header">
          <span className="place-title"><a href={url}><strong>{placeName}</strong></a></span>
          <span className="place-category">{category.slice(category.indexOf('>') + 1)}</span>
        </section>
        <section className="place-desc">
          {address}
        </section>
        {
          goToRecord && (
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
              <section className="place-desc score-info">
                <FontAwesomeIcon icon={faStarHalfAlt}/>
                <Rating
                  readonly={true}
                  className="star-rating"
                  placeholderRating={score}
                  emptySymbol={<StarEmpty/>}
                  placeholderSymbol={<StarFull/>}
                  fullSymbol={<StarFull/>}
                />
              </section>
            </>
          )
        }
      </div>
    </article>
  );
};

export default Place;
