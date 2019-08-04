import React from "react";
import "./Header.scss";
import {getMe} from "../../_common/utils";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faWalking} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const Header = () => {
  const {nickname} = getMe();
  
  return (
    <header className="header">
      <div className="">
        <Link to="/record">
          <FontAwesomeIcon icon={faEdit}/>
          <strong>Do Eat, Record!</strong>
        </Link>
      </div>
      <p><strong>{nickname}</strong>님, 반갑습니다.</p>
      <div className="view-icon">
        <Link to="/me">
          <FontAwesomeIcon icon={faWalking}/>
        </Link>
      </div>
    </header>
  );
};

export default Header;