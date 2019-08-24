import React, {useContext, useRef} from "react";
import ReactSwipe from "react-swipe";
import {SearchContext} from "../contexts/SearchContext";
import StoreCard from "./StoreCard";
import "./SwipeBar.scss";

const SwipeBar = () => {
  
  const swipeEl = useRef(null);
  const {state: {searchList}} = useContext(SearchContext);
  
  return (
    <div className="swipe-bar">
      <ReactSwipe
        swipeOptions={{ continuous: false }}
        ref={swipeEl}
      >
        {
          searchList.map(store => <StoreCard key={store.id} store={store}/>)
        }
      </ReactSwipe>
    </div>
  );
};

export default SwipeBar;