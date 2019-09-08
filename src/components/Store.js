import React from "react";
import "./Store.scss";

const Store = ({store, viewDetail}) => {
  
  const {place_name, category_name, road_address_name, address_name, place_url, id} = store;
  
  const record = () => {
    sessionStorage.setItem("store", JSON.stringify(store));
    viewDetail(id);
  };
  
  return (
    <article className="store">
      <section className="store-desc store-header">
        <span className="store-title"><strong>{place_name}</strong></span>
        <span className="store-category">{category_name}</span>
      </section>
      <section className="store-desc store-address">
        {road_address_name || address_name}
      </section>
      {
        viewDetail ? (
          <section className="store-desc store-swipe-card">
            <div><a href={place_url}>카카오맵에서 확인하기</a></div>
            <button type="button" className="btn btn-detail" onClick={record}>기록하러 가기</button>
          </section>
        ) : (
          <section className="store-desc store-list-item">
          
          </section>
        )
      }
    </article>
  );
};

export default Store;