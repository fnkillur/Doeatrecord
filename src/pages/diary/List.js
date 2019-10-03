import React, {useEffect} from "react";
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import {debounce} from "lodash";
import queryString from "query-string";
import classNames from "classnames";
import {ClipLoader} from 'react-spinners';
import Emoji from "react-emoji-render";
import Error from "../../components/Error";
import Place from "../../components/Place";
import "./List.scss"

const GET_RECORDS = gql`
  query Records($userId: String!, $keyword: String, $cursor: Int) {
    records(userId: $userId, keyword: $keyword, cursor: $cursor) {
      records {
        _id
        placeName
        category
        url
        visitedDate
        changedYear
        changedMonth
        menus
        money
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
  
  if (loading) return <ClipLoader size={50} color="white"/>;
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
  
  if (!records.length) return <>기록된 내용이 없어요... <Emoji text=":cry:"/></>;
  
  return (
    <main className="list">
      <div className="list-inner">
        {
          records.map(({_id, changedYear, changedMonth, ...rest}) => (
            <div key={_id}>
              {
                (changedYear || changedMonth) ? (
                  <div className={classNames("list-changed-date", {"list-changed-year": changedYear})}>
                    <strong>{changedYear ? `${changedYear.substr(2)}년` : ''} {changedMonth}월</strong>
                  </div>
                ) : ''
              }
              <Place place={{_id, ...rest}}/>
            </div>
          ))
        }
      </div>
    </main>
  );
};

export default List;