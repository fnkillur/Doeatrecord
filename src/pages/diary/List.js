import React, {useEffect, useRef} from "react";
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import {debounce} from "lodash";
import queryString from "query-string";
import classNames from "classnames";
import {ClipLoader} from "react-spinners";
import "rc-swipeout/assets/index.css"
import Emoji from "react-emoji-render";
import Error from "../../components/Error";
import SwipeRecord from "../../organisms/diary/SwipeRecord";
import "./List.scss"

const GET_RECORDS = gql`
  query ($userId: String!, $keyword: String, $cursor: Int) {
    records(userId: $userId, keyword: $keyword, cursor: $cursor) {
      records {
        _id
        userId
        placeId
        placeName
        category
        url
        address
        visitedDate
        changedYear
        changedMonth
        menus
        money
        score
        isDutch
      }
      cursor
      hasMore
    }
  }
`;

const List = ({match: {params: {userId}}, location: {search}, history}) => {
  const listRef = useRef(null);
  
  const {keyword} = queryString.parse(search);
  const {loading, error, data, fetchMore, refetch} = useQuery(GET_RECORDS, {
    variables: {userId, keyword}
  });
  
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
    const {scrollHeight} = document.body;
    const {innerHeight, scrollY} = window;
    
    if (innerHeight + scrollY === scrollHeight) {
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
    <main className="list" ref={listRef}>
      <div className="list-inner">
        {
          records.map(({_id, placeId, changedYear, changedMonth, ...rest}) => (
            <div key={_id}>
              {
                (changedYear || changedMonth) ?
                  <div className={classNames("list-changed-date", {"list-changed-year": changedYear})}>
                    <strong>{changedYear ? `${changedYear.substr(2)}년` : ''} {changedMonth}월</strong>
                  </div>
                  :
                  null
              }
              <SwipeRecord
                _id={_id}
                placeId={placeId}
                place={{_id, placeId, ...rest}}
                refetch={refetch}
                goToModify={url => history.push(url)}
              />
            </div>
          ))
        }
      </div>
    </main>
  );
};

export default List;
