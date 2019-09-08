import React, {useEffect, useState, useRef} from 'react';
import PropTypes from 'prop-types';
import './SearchBar.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons'
import {ENTER} from '../_common/const';

const SearchBar = ({keyword, searchKeyword, cleanKeyword}) => {
  
  const [text, setText] = useState('');
  
  useEffect(() => {
    setText(keyword || '');
  }, [keyword]);
  
  const inputEl = useRef(null);
  
  const onKeyDown = ({keyCode}) => {
    if (keyCode === ENTER) {
      inputEl.current.blur();
      searchKeyword(text);
    }
  };
  
  return (
    <div className="search-container">
      <input
        ref={inputEl}
        type="text"
        className="search-text"
        placeholder={"어떤 가게를 방문하셨나요?"}
        value={text}
        onChange={({target: {value}}) => setText(value)}
        onKeyDown={onKeyDown}
      />
      <div className="search-icon">
        <FontAwesomeIcon icon={faSearch} onClick={() => searchKeyword(text)}/>
        <FontAwesomeIcon icon={faTimes} onClick={cleanKeyword}/>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  searchKeyword: PropTypes.func
};

export default SearchBar;