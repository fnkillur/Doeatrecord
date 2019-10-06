import React, {useState} from "react";
import {useQuery} from "@apollo/react-hooks";
import gql from "graphql-tag";
import {ClipLoader} from "react-spinners";
import Error from "../../components/Error";
import Map from "../../components/Map";
import "./CountedMap.scss";

const GET_COUNTED_RECORDS = gql`
  query CountedRecords($userId: String!) {
    countedRecords(userId: $userId) {
      _id
      placeName
      count
      url
      x
      y
    }
  }
`;

const CountedMap = ({match: {params: {userId}}, location: {search}}) => {
  
  const [selectedIndex, setIndex] = useState(-1);
  const {loading, error, data} = useQuery(GET_COUNTED_RECORDS, {variables: {userId}});
  
  if (loading) return <ClipLoader size={50} color="white"/>;
  if (error) return <Error message={error.toString()}/>;
  
  const {countedRecords} = data;
  
  return (
    <main className="counted-map">
      <section className="map-box">
        <Map
          list={countedRecords}
          selectedIndex={selectedIndex}
          setIndex={setIndex}
          isRanking={true}
        />
      </section>
      <section className="counted-map-ranking">
        <span className="ranking-title">최다 방문 Best 3</span>
        {
          countedRecords.slice(0, 3).map(({_id, placeName, count, url}, i) => {
            return (
              <div key={_id} className="ranking-card">
                <div className="ranking-field">{i + 1}위</div>
                <div className="ranking-field"><a href={url}>{placeName}</a></div>
                <div className="ranking-field">({count}번)</div>
              </div>
            );
          })
        }
      </section>
    </main>
  );
};

export default CountedMap;