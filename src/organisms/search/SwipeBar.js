import React, {useContext, useRef} from "react";
import ReactSwipe from "react-swipe";
import {SearchListContext} from "../../contexts/SearchListContext";
import {SELECT_PLACE} from "../../reducers/SearchListReducer";
import Store from "../../components/Store";
import "./SwipeBar.scss";

const SwipeBar = ({viewDetail}) => {
  
  const swipeEl = useRef(null);
  const {state: {list, selectedIndex}, dispatch} = useContext(SearchListContext);
  const options = {
    startSlide: selectedIndex,
    continuous: false,
    transitionEnd(index) {
      dispatch([SELECT_PLACE, index]);
    }
  };
  
  return (
    <div className="swipe-bar">
      <ReactSwipe swipeOptions={options} ref={swipeEl}>
        {
          list.map(store => <Store key={store.id} store={store} viewDetail={viewDetail}/>)
        }
      </ReactSwipe>
    </div>
  );
};

export default SwipeBar;