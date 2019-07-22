import React from 'react';
import PropTypes from 'prop-types';
import './SearchBar.scss';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

const SearchBar = ({placeholder, containerClass, labelClass, inputClass}) => {
  return (
    <div className={containerClass}>
      <div className={labelClass}><FontAwesomeIcon icon={faSearch}/></div>
      <input type="text" className={inputClass} placeholder={placeholder}/>
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  containerClass: PropTypes.string,
  labelClass: PropTypes.string,
  inputClass: PropTypes.string
};

SearchBar.defaultProps = {
  placeholder: '검색어를 입력해보세요.',
  containerClass: 'search-container',
  labelClass: 'search-icon',
  inputClass: 'search-box'
};

export default SearchBar;