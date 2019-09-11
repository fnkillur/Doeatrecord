import React, {useEffect, useRef, useState} from "react";
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import {getMe} from "../../_common/utils";
import Error from "../../components/Error";
import Place from "../../components/Place";
import "./List.scss"

const GET_RECORDS = gql`
  query Records($userId: String!) {
    records(userId: $userId) {
      _id
      userId
      placeId
      placeName
      category
      x
      y
      visitedDate
      menus
      money
      created
      updated
      isDelete
    }
  }
`;

const List = () => {
  
  const listEl = useRef(null);
  
  const [pageNo, setPageNo] = useState(1);
  
  const {loading, error, data, refetch} = useQuery(GET_RECORDS, {
    variables: {
      userId: getMe().id,
      pageNo
    },
    notifyOnNetworkStatusChange: true,
  });
  
  const handleScroll = () => {
    const {innerHeight, scrollY} = window;
    const {clientHeight} = document.body;
    
    if (clientHeight - innerHeight - scrollY < 50) {
      setPageNo(pageNo + 1);
    }
  };
  
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  if (loading) return <div>기록을 가져오는 중입니다...</div>;
  if (error) return <Error message={error.toString()}/>;
  
  const {records} = data;
  return (
    <main className="list" ref={listEl} onScroll={handleScroll}>
      <section className="list-menu">
      
      </section>
      {
        records.map(({_id, ...rest}) => <Place key={_id} store={{_id, ...rest}}/>)
      }
    </main>
  );
};

export default List;