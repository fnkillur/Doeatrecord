import React from "react";
import classNames from "classnames";
import SearchBar from "../../components/SearchBar";
import "./Footer.scss";

const Footer = ({isShow, keyword, type, searchRecords}) => {
  
  const searchKeyword = keyword => searchRecords(type, keyword);
  
  return (
    <footer className={classNames("footer", {"footer-fixed": isShow})}>
      {
        isShow && (
          <section className="footer-search">
            <SearchBar
              keyword={keyword}
              searchKeyword={searchKeyword}
              placeholder="내가 이걸 먹었었나...?"
            />
          </section>
        )
      }
      Copyright © Teo dor. All rights reserved.
    </footer>
  );
};

export default Footer;