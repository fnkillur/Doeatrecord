import React, {useEffect, useRef, useState} from 'react';
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
        type="search"
        className="search-text"
        placeholder={placeholder}
        value={text}
        onChange={({target: {value}}) => setText(value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default SearchBar;