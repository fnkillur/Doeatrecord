import React, {useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons'
import {ENTER} from '../_common/const';
import './SearchBar.scss';

const SearchBar = ({keyword, searchKeyword, placeholder}) => {
  
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
        placeholder={placeholder}
        value={text}
        onChange={({target: {value}}) => setText(value)}
        onKeyDown={onKeyDown}
      />
      <div className="search-icon">
        <FontAwesomeIcon icon={faSearch} onClick={() => searchKeyword(text)}/>
        <FontAwesomeIcon icon={faTimes} onClick={() => searchKeyword('')}/>
      </div>
    </div>
  );
};

SearchBar.propTypes = {
  searchKeyword: PropTypes.func
};

export default SearchBar;