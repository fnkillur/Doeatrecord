import React from "react";
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import {ClipLoader} from "react-spinners";
import Emoji from "react-emoji-render";

const GET_USERS = gql`
  query ($keyword: String, $myId: String!, $alarm: Boolean) {
    users(keyword: $keyword) {
      userId
      nickname
      coupleId
      friends
    }

    requestedAlarms(applicantId: $myId, alarm: $alarm) {
      _id
      targetId
      targetName
      type
      result
    }
  }
`;

const FriendList = ({myId, myLover, keyword, requestMatching}) => {
  
  const {loading, error, data} = useQuery(GET_USERS, {variables: {keyword, myId, alarm: false}});
  
  if (loading) return <ClipLoader size={50} color="white"/>;
  if (error) return <>사용자 목록을 가져오는데 실패했어요.<Emoji text=":cry:"/></>;
  
  const {users, requestedAlarms} = data;
  const iAmSolo = !myLover;
  
  return (
    <>
      {
        users.map(({userId, nickname, coupleId, friends}) => {
          const isMyLover = userId === myLover;
          const request = requestedAlarms.find(matching => matching.targetId === userId);
          const heOrSheIsSoloToo = !coupleId;
          const isNotMyFriend = !friends.includes(myId);
          
          return (
            <div key={userId} className="profile-info">
              <div className="profile-nickname"><strong>{nickname}</strong></div>
              {
                isMyLover ?
                  <Emoji text=":profile-couple-emoji:"/>
                  :
                  !request ?
                    <div className="profile-btn-couple">
                      {
                        iAmSolo && heOrSheIsSoloToo && (
                          <button type="button" className="btn"
                                  onClick={() => requestMatching(userId, nickname, 'couple')}>
                            커플 요청
                          </button>
                        )
                      }
                      {
                        isNotMyFriend && (
                          <button type="button" className="btn"
                                  onClick={() => requestMatching(userId, nickname, 'friend')}>
                            친구 요청
                          </button>
                        )
                      }
                    </div>
                    :
                    !request.result ?
                      <span>{request.type === 'couple' ? '커플' : '친구'}요청 대기</span>
                      :
                      null
              }
            </div>
          );
        })
      }
    </>
  );
};

export default FriendList;
