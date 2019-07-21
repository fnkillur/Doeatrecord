import React from 'react';
import PropTypes from 'prop-types';

const SearchBar = ({placeholder, className}) => {
  return (
    <div>
      <label></label>
      <inpyt type="text" className={className} placeholder={placeholder}/>
    </div>
  );
};

SearchBar.propTypes = {
  placeholder: PropTypes.string,
  className: PropTypes.string
};

SearchBar.defaultProps = {
  placeholder: '검색어를 입력해보세요.',
  className: ''
};

export default SearchBar;