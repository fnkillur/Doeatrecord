import React, {useContext, useState, useEffect} from "react";
import "./Detail.scss";
import gql from "graphql-tag";
import {useMutation} from "@apollo/react-hooks";
import {SearchContext} from "../../contexts/SearchContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCreditCard, faLink, faListOl, faMapMarkerAlt, faPhoneAlt} from "@fortawesome/free-solid-svg-icons";

const CREATE_RECORD = gql`
  mutation CreateRecord($input: newRecord!) {
    createRecord(input: $input) {
      userId
      placeId
      category
      money
      menus
      created
    }
  }
`;

const Detail = () => {
  const {place} = useContext(SearchContext);
  const {place_name, address_name, road_address_name, phone, place_url, id, x, y} = place;
  const [isRecord, setIsRecord] = useState(false);
  useEffect(() => {
    const record = async () => {
    
    };
    isRecord && record();
  }, [isRecord]);
  
  return (
    <article className="detail">
      <h2 class="title">{place_name}</h2>
      <div className="field">
        <FontAwesomeIcon icon={faMapMarkerAlt}/><span>{road_address_name || address_name}</span>
      </div>
      <div className="field">
        <FontAwesomeIcon icon={faPhoneAlt}/><span>{phone}</span>
      </div>
      <div className="field">
        <FontAwesomeIcon icon={faLink}/><a href={place_url}>카카오맵 링크</a>
      </div>
      <div className="field sub-title">
        <span><strong>오늘 여기서 !</strong></span>
      </div>
      <div className="field">
        <FontAwesomeIcon icon={faListOl}/>
        <input type="text" className="input menu" placeholder="특히 이런걸 먹었고"/>
      </div>
      <div className="field">
        <FontAwesomeIcon icon={faCreditCard}/>
        <input type="text" className="input money" placeholder="돈은 이만큼 썼네?"/>
      </div>
      <div className="field btn-box">
        <button type="button" className="btn btn-record" onClick={() => setIsRecord(true)}>기록하자!</button>
      </div>
    </article>
  );
};

export default Detail;