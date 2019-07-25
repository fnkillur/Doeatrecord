import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './SearchBar.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {ENTER} from '../_common/const';

const SearchBar = ({placeholder, containerClass, labelClass, inputClass, onKeyEnter}) => {
  
  const [text, setText] = useState('');
  
  const onChange = ({target: {value: text}}) => {
    setText(text);
  };
  
  const onKeyDown = ({keyCode}) => {
    if (keyCode === ENTER) {
      onKeyEnter(text);
    }
  };
  
  return (
    <div className={containerClass}>
      <div className={labelClass}><FontAwesomeIcon icon={faSearch}/></div>
      <input
        type="text" className={inputClass} placeholder={placeholder}
        value={text} onChange={onChange} onKeyDown={onKeyDown}
      />
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  containerClass: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string,
  onKeyEnter: PropTypes.func
};

SearchBar.defaultProps = {
  placeholder: '검색어를 입력해보세요.',
  containerClass: 'search-container',
  labelClass: 'search-icon',
  inputClass: 'search-text'
};

export default SearchBar;