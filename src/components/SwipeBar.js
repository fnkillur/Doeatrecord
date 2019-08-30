import React, {useContext, useRef} from "react";
import ReactSwipe from "react-swipe";
import {SearchListContext} from "../contexts/SearchListContext";
import StoreCard from "./StoreCard";
import "./SwipeBar.scss";
import {SELECT_PLACE} from "../reducers/SearchListReducer";

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
      <ReactSwipe
        swipeOptions={options}
        ref={swipeEl}
      >
        {
          list.map(store => <StoreCard key={store.id} store={store} viewDetail={viewDetail}/>)
        }
      </ReactSwipe>
    </div>
  );
};

export default SwipeBar;