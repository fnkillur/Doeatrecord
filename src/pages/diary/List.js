import React, {useEffect, useRef, useState} from "react";
import {gql} from "apollo-boost";
import {useMutation, useQuery} from "@apollo/react-hooks";
import {debounce} from "lodash";
import queryString from "query-string";
import classNames from "classnames";
import {ClipLoader} from "react-spinners";
import Swipeout from "rc-swipeout";
import "rc-swipeout/assets/index.css"
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

const DELETE_RECORD = gql`
  mutation ($_id: ID!) {
    deleteRecord(_id: $_id)
  }
`;

const List = ({match: {params: {userId}}, location: {search}}) => {
  
  const listRef = useRef(null);
  
  const {keyword} = queryString.parse(search);
  const {loading, error, data, fetchMore, refetch} = useQuery(GET_RECORDS, {variables: {userId, keyword}});
  
  useEffect(() => {
    if (loading || error) {
      return;
    }
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, error, data]);
  
  const [deleteRecord] = useMutation(DELETE_RECORD);
  const [deletingId, setDeletingId] = useState('');
  
  useEffect(() => {
    const doDelete = async () => {
      const result = await deleteRecord({variables: {_id: deletingId}});
      result ? refetch() : alert('삭제에 실패했습니다.');
    };
    deletingId && doDelete();
  }, [deletingId]);
  
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
          records.map(({_id, changedYear, changedMonth, ...rest}) => (
            <div key={_id}>
              {
                (changedYear || changedMonth) ? (
                  <div className={classNames("list-changed-date", {"list-changed-year": changedYear})}>
                    <strong>{changedYear ? `${changedYear.substr(2)}년` : ''} {changedMonth}월</strong>
                  </div>
                
                ) : null
              }
              <div style={{marginBottom: "10px"}}>
                <Swipeout
                  left={[
                    {
                      text: '수정',
                      onPress: () => console.log('수정'),
                      style: {backgroundColor: 'orange', color: 'white'},
                      className: 'custom-class-1'
                    }
                  ]}
                  right={[
                    {
                      text: '삭제',
                      onPress: () => (confirm('정말 이 기록을 삭제하시겠습니까?') && setDeletingId(_id)),
                      style: {backgroundColor: 'red', color: 'white'},
                      className: 'custom-class-2'
                    }
                  ]}
                  autoClose={true}
                >
                  <Place place={{_id, ...rest}}/>
                </Swipeout>
              </div>
            </div>
          ))
        }
      </div>
    </main>
  );
};

export default List;