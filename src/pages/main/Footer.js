import React, {useEffect, useState} from "react";
import classNames from "classnames";
import SearchBar from "../../components/SearchBar";
import "./Footer.scss";

const types = ['list', 'map'];

const Footer = ({isShow, initType, keyword, searchRecords}) => {
  
  const [type, setType] = useState('list');
  
  useEffect(() => {
    types.includes(initType) && setType(initType);
  }, [initType]);
  
  const searchKeyword = keyword => searchRecords(type, keyword);
  
  return (
    <footer className={classNames("footer", {"footer-fixed": isShow})}>
      {
        isShow && (
          <section className="footer-search">
            <select
              className="footer-search-type"
              name="type"
              value={type}
              onChange={({target: {value}}) => setType(value)}
            >
              <option value="list">목록</option>
              <option value="map">지도</option>
            </select>
            <div>
              <SearchBar
                keyword={keyword}
                searchKeyword={searchKeyword}
                placeholder="내가 이걸 먹었었나...?"
              />
            </div>
          </section>
        )
      }
      Copyright © Teo dor. All rights reserved.
    </footer>
  );
};

export default Footer;