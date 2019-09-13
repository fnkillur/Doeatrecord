import React, {useContext} from "react";
import ReactSwipe from "react-swipe";
import {SearchListContext} from "../../contexts/SearchListContext";
import {SELECT_PLACE} from "../../reducers/SearchListReducer";
import Place from "../../components/Place";
import "./SearchList.scss";

const SearchList = ({viewDetail}) => {
  
  const {state: {list, selectedIndex}, dispatch} = useContext(SearchListContext);
  const options = {
    startSlide: selectedIndex,
    continuous: false,
    transitionEnd(index) {
      dispatch([SELECT_PLACE, index]);
    }
  };
  
  return (
    <div className="search-list">
      <ReactSwipe swipeOptions={options}>
        {
          list.map(({placeId, ...rest}) => <Place key={placeId} store={{placeId, ...rest}} viewDetail={viewDetail}/>)
        }
      </ReactSwipe>
    </div>
  );
};

export default SearchList;