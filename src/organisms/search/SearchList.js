import React from "react";
import ReactSwipe from "react-swipe";
import Place from "../../components/Place";
import "./SearchList.scss";

const SearchList = ({startSlide, setSelectedIndex, placeList, goToRecord}) => {
  const options = {
    startSlide,
    continuous: false,
    transitionEnd(index) {
      setSelectedIndex(index);
    }
  };
  
  return (
    <div className="search-list">
      <ReactSwipe swipeOptions={options}>
        {
          placeList.map(place => {
            const {placeId} = place;
            const record = () => {
              sessionStorage.setItem("place", JSON.stringify({...place}));
              goToRecord(placeId);
            };
            
            return (
              <Place
                key={placeId}
                place={place}
                goToRecord={goToRecord}
                record={record}
              />
            )
          })
        }
      </ReactSwipe>
    </div>
  );
};

export default SearchList;
