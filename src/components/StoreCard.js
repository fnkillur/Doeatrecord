import React from "react";
import "./StoreCard.scss";

const StoreCard = ({store}) => {
  console.log(store);
  const {place_name, category_name, phone, road_address_name, address_name, place_url} = store;
  return (
    <article className="store-card">
      <section>
        <h4>{place_name}</h4>
        <div>
          {category_name}
        </div>
        <div>
          {phone}
        </div>
        <div>
          {road_address_name || address_name}
        </div>
        <div>
          <a href={place_url}>카카오맵 링크</a>
        </div>
      </section>
      <section>
        <button>기록하기</button>
      </section>
    </article>
  );
};

export default StoreCard;