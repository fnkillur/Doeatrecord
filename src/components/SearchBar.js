import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import './SearchBar.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch, faTimes} from '@fortawesome/free-solid-svg-icons'
import {ENTER} from '../_common/const';

const SearchBar = ({keyword, searchKeyword}) => {
  
  const [text, setText] = useState('');
  
  useEffect(() => {
    setText(keyword || '');
  }, [keyword]);
  
  return (
    <div className="search-container">
      <input
        type="text" className="search-text"
        placeholder={"어떤 가게를 방문하셨나요?"}
        value={text}
        onChange={({target: {value}}) => setText(value)}
        onKeyDown={({keyCode}) => keyCode === ENTER && searchKeyword(text)}
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