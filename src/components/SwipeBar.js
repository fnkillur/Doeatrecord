import React, {useContext, useRef} from "react";
import ReactSwipe from "react-swipe";
import {SELECT_PLACE} from "../reducers/SearchReducer";
import {SearchContext} from "../contexts/SearchContext";
import StoreCard from "./StoreCard";
import "./SwipeBar.scss";

const SwipeBar = ({viewDetail}) => {
  
  const swipeEl = useRef(null);
  const {state: {searchList}, dispatch} = useContext(SearchContext);
  const options = {
    continuous: false,
    //TODO: 스와이프 시 포커스 된 가게 정보 전달 후 지도에서 해당 핀으로 포커스
    // callback(i) {
    //   dispatch([SELECT_PLACE, searchList[i].id]);
    // }
  };
  
  return (
    <div className="swipe-bar">
      <ReactSwipe
        swipeOptions={options}
        ref={swipeEl}
      >
        {
          searchList.map(store => <StoreCard key={store.id} store={store} viewDetail={viewDetail}/>)
        }
      </ReactSwipe>
    </div>
  );
};

export default SwipeBar;