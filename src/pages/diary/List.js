import React, {useEffect} from "react";
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import {debounce} from "lodash";
import Error from "../../components/Error";
import Place from "../../components/Place";
import "./List.scss"
import queryString from "query-string";

const GET_RECORDS = gql`
  query Records($userId: String!, $keyword: String, $cursor: Int) {
    records(userId: $userId, keyword: $keyword, cursor: $cursor) {
      records {
        _id
        userId
        placeId
        placeName
        category
        url
        x
        y
        visitedDate
        menus
        money
        created
        updated
        isDelete
      }
      cursor
      hasMore
    }
  }
`;

const List = ({match: {params: {userId}}, location: {search}}) => {
  
  const {keyword} = queryString.parse(search);
  const {loading, error, data, fetchMore} = useQuery(GET_RECORDS, {variables: {userId, keyword}});
  
  useEffect(() => {
    if (loading || error) {
      return;
    }
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, error, data]);
  
  if (loading) return <div>기록을 가져오는 중입니다...</div>;
  if (error) return <Error message={error.toString()}/>;
  
  const {records: {records, cursor, hasMore}} = data;
  
  const handleScroll = debounce(() => {
    const {innerHeight, scrollY} = window;
    
    if (innerHeight - scrollY - 160 < 100) {
      hasMore && fetchMore({
        variables: {cursor, keyword},
        updateQuery(prev, {fetchMoreResult}) {
          return fetchMoreResult ? fetchMoreResult : prev;
        }
      });
    }
  }, 100);
  
  return (
    <main className="list">
      <div className="list-inner">
        {
          records.map(({_id, ...rest}) => <Place key={_id} store={{_id, ...rest}}/>)
        }
      </div>
    </main>
  );
};

export default List;