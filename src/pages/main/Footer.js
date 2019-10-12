import React from "react";
import classNames from "classnames";
import SearchBar from "../../components/SearchBar";
import "./Footer.scss";

const Footer = ({isShow, type, keyword, searchRecords}) => {
  
  const searchKeyword = keyword => searchRecords(type, keyword);
  
  return (
    <footer className={classNames("footer", {"footer-fixed": isShow})}>
      {
        isShow && (
          <section className="footer-search">
            <SearchBar
              keyword={keyword}
              searchKeyword={searchKeyword}
              placeholder="기록한 내용을 검색해보세요."
              isDiary={isShow}
            />
          </section>
        )
      }
    </footer>
  );
};

export default Footer;