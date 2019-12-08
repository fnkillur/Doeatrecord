import React, {useEffect, useState} from "react";
import {gql} from "apollo-boost";
import {useMutation, useQuery} from "@apollo/react-hooks";
import Emoji from "react-emoji-render";
import queryString from "query-string";
import {ClipLoader} from "react-spinners";
import {getMe, isAutoLogin} from "../../_common/utils";
import ReceivedAlarms from "../../organisms/auth/ReceivedAlarms";
import RequestedAlarms from "../../organisms/auth/RequestedAlarms";
import SearchBar from "../../components/SearchBar";
import FriendList from "../../organisms/auth/FriendList";
import "./Me.scss";

const GET_MY_INFO = gql`
  query ($myId: String!) {
    myLover(myId: $myId) {
      nickname
    }
    receivedAlarms(targetId: $myId) {
      _id
      applicantId
      applicantName
      type
    }
    requestedAlarms(applicantId: $myId) {
      _id
      targetId
      targetName
      type
      result
    }
  }
`;

const REQUEST_MATCHING = gql`
  mutation ($applicantId: String!, $applicantName: String!, $targetId: String!, $targetName: String!, $type: String!){
    requestMatching(applicantId: $applicantId, applicantName: $applicantName, targetId: $targetId, targetName: $targetName, type: $type)
  }
`;

const Me = ({location: {search}, history}) => {
  
  const {myId, myName} = getMe();
  
  const {loading, error, data} = useQuery(GET_MY_INFO, {variables: {myId}});
  
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
  
  const clearAutoLogin = () => {
    if (confirm('정말 해제하시겠습니까?')) {
      localStorage.removeItem('me');
      location.reload();
    }
  };
  
  return (
    <main className="me">
      {
        isAutoLogin && (
          <section className="auto-login-clear">
            <button type="button" className="btn btn-auto-login-clear" onClick={clearAutoLogin}>
              자동로그인 해제
            </button>
          </section>
        )
      }
      <section className="profile-info">
        <div className="profile-nickname"><strong>{myName}</strong>님,</div>환영합니다.
      </section>
      {
        loading ?
          <ClipLoader size={50} color="white"/>
          :
          error ?
            error.toString()
            :
            data ?
              <>
                {
                  data.myLover && (
                    <section className="me-couple-info">
                      <div className="profile-nickname">
                        <strong>{myName}</strong>
                      </div>
                      <Emoji text={":cupid:"} onlyEmojiClassName="profile-couple-emoji"/>
                      <div className="profile-nickname">
                        <strong>{data.myLover.nickname}</strong>
                      </div>
                    </section>
                  )
                }
                <hr className="section-divider"/>
                <section className="me-alarm">
                  <ReceivedAlarms myId={myId} receivedAlarms={data.receivedAlarms}/>
                  <RequestedAlarms requestedAlarms={data.requestedAlarms}/>
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
                      myLover={data.myLover}
                      keyword={keyword}
                      requestMatching={(id, name, type) => {
                        setTargetId(id);
                        setTargetName(name);
                        setType(type);
                      }}
                      requestedList={data.requestedAlarms}
                    />
                  </div>
                </section>
              </>
              :
              null
      }
    </main>
  );
};

export default Me;
