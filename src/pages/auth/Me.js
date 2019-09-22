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

const REQUEST_MATCHING = gql`
  mutation RequestMatching($applicantId: String!, $applicantName: String!, $targetId: String!, $targetName: String!, $type: String!){
    requestMatching(applicantId: $applicantId, applicantName: $applicantName, targetId: $targetId, targetName: $targetName, type: $type)
  }
`;

const Me = ({location: {search}, history}) => {
  
  const {myId, myName, thumbnail} = getMe();
  
  const {keyword} = queryString.parse(search);
  const searchKeyword = keyword => history.push(`/main/me${keyword ? `?keyword=${keyword}` : ''}`);
  
  const [requestMatching] = useMutation(REQUEST_MATCHING);
  const [targetId, setTargetId] = useState('');
  const [targetName, setTargetName] = useState('');
  const [type, setType] = useState('');
  
  useEffect(() => {
    const request = async () => {
      const result = await requestMatching({
        variables: {
          applicantId: myId,
          applicantName: myName,
          targetId,
          targetName,
          type
        }
      });
      const typeString = type === 'couple' ? '커플' : '친구';
      result ? alert(`${typeString} 요청되었습니다.`) : alert(`${typeString} 요청에 실패했습니다.`);
    };
    targetId && request();
  }, [targetId]);
  
  return (
    <main className="me">
      <section className="profile-info">
        <img src={thumbnail} className="profile-thumbnail-img"/>
        <div className="profile-nickname">
          <strong>{myName}</strong>님,
        </div>
        환영합니다.<Emoji text=":bow:"/>
      </section>
      <section className="me-alarm">
        <ReceivedAlarms myId={myId} myName={myName}/>
      </section>
      <section className="me-search-friends">
        <SearchBar
          keyword={keyword}
          searchKeyword={searchKeyword}
          placeholder="친구들을 검색해보세요."
        />
        <div className="me-search-result">
          <FriendList
            myId={myId}
            keyword={keyword}
            requestMatching={(id, name, type) => {
              setTargetId(id);
              setTargetName(name);
              setType(type);
            }}
            goToFriend={friendId => history.push(`/main/diary/list/${friendId}`)}
          />
        </div>
      </section>
    </main>
  );
};

export default Me;