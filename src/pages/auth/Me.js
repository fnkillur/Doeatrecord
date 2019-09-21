import React, {useEffect, useState} from "react";
import {gql} from "apollo-boost";
import {useMutation} from "@apollo/react-hooks";
import Emoji from "react-emoji-render";
import queryString from "query-string";
import {getMe} from "../../_common/utils";
import SearchBar from "../../components/SearchBar";
import FriendList from "../../organisms/auth/FriendList";
import "./Me.scss";
import ReceivedAlarms from "../../organisms/auth/ReceivedAlarms";

const REQUEST_COUPLE = gql`
  mutation RequestCouple($me: String!, $you: String!, $type: String!){
    requestCouple(me: $me, you: $you, type: $type)
  }
`;

const Me = ({location: {search}, history}) => {
  
  const {userId: me, nickname, thumbnail} = getMe();
  
  const {keyword} = queryString.parse(search);
  const searchKeyword = keyword => history.push(`/main/me${keyword ? `?keyword=${keyword}` : ''}`);
  
  const [requestCouple] = useMutation(REQUEST_COUPLE);
  const [you, setYou] = useState('');
  const [type, setType] = useState('');
  
  useEffect(() => {
    const request = async () => {
      const result = await requestCouple({
        variables: {
          me, you, type
        }
      });
      result ? alert(`${type} 요청되었습니다.`) : alert(`${type} 요청에 실패했습니다.`);
    };
    you && request();
  }, [you]);
  
  return (
    <main className="me">
      <section className="profile-info">
        <img src={thumbnail} className="profile-thumbnail-img"/>
        <div className="profile-nickname">
          <strong>{nickname}</strong>님,
        </div>
        환영합니다.<Emoji text=":bow:"/>
      </section>
      <section className="me-alarm">
        <ReceivedAlarms me={me}/>
      </section>
      <section className="me-search-friends">
        <SearchBar
          keyword={keyword}
          searchKeyword={searchKeyword}
          placeholder="친구들을 검색해보세요."
        />
        <div className="me-search-result">
          <FriendList
            me={me}
            keyword={keyword}
            requestCouple={coupleId => {
              setYou(coupleId);
              setType('couple');
            }}
            requestFriend={friendId => {
              setYou(friendId);
              setType('friend');
            }}
            goToFriend={friendId => history.push(`/main/diary/list/${friendId}`)}
          />
        </div>
      </section>
    </main>
  );
};

export default Me;