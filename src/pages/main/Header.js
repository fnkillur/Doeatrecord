import React, {useContext} from "react";
import "./Header.scss";
import UserContext from "../../contexts/UserContext";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit, faWalking} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";

const Header = () => {
  const {user: {nickname}} = useContext(UserContext);
  
  return (
    <header className="header">
      <div className="">
        <Link to="/main/record">
          <FontAwesomeIcon icon={faEdit}/>
          <strong>Do Eat, Record!</strong>
        </Link>
      </div>
      {nickname}, 반갑습니다.
      <div className="view-icon">
        <Link to="/me">
          <FontAwesomeIcon icon={faWalking}/>
        </Link>
      </div>
    </header>
  );
};

export default Header;