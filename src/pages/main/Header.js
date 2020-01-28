import React, {useEffect, useState} from "react";
import classNames from "classnames";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBars, faEdit, faTimes, faUser} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import Nav from "./Nav";
import "./Header.scss";

function Header() {
  const [isShowNav, setIsShowNav] = useState(false);
  
  useEffect(() => {
    document.body.style.overflow = isShowNav ? "hidden" : "scroll";
    
    return () => {
      document.body.style.overflow = "scroll";
    };
  }, [isShowNav]);
  
  const close = () => setIsShowNav(false);
  
  return (
    <header className={classNames("header", {"header-open": isShowNav})}>
      <section className="header-nav">
        <a onClick={() => setIsShowNav(!isShowNav)}>
          {
            isShowNav ? <FontAwesomeIcon icon={faTimes}/> : <FontAwesomeIcon icon={faBars}/>
          }
        </a>
        <Link to="/main/search" onClick={close}>
          <FontAwesomeIcon icon={faEdit}/>
          <strong> Do Eat, Record!</strong>
        </Link>
        <Link to="/main/me" onClick={close}>
          <FontAwesomeIcon icon={faUser}/>
        </Link>
      </section>
      {
        isShowNav && <Nav close={close}/>
      }
    </header>
  );
}

export default Header;
