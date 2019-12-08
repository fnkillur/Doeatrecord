import React from "react";
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import {ClipLoader} from "react-spinners";
import Emoji from "react-emoji-render";

const GET_USERS = gql`
  query Users($keyword: String) {
    users(keyword: $keyword) {
      userId
      nickname
      coupleId
      friends
    }
  }
`;

const FriendList = ({myId, myLover, keyword, requestMatching, requestedList}) => {
  
  const {loading, error, data} = useQuery(GET_USERS, {variables: {keyword}});
  
  if (loading) return <ClipLoader size={50} color="white"/>;
  if (error) return <>사용자 목록을 가져오는데 실패했어요.<Emoji text=":cry:"/></>;
  
  const {users} = data;
  const iAmSolo = !myLover;
  
  return (
    <>
      {
        users.map(({userId, nickname, coupleId, friends}) => {
          const isMyLover = userId === myLover;
          const isRequested = requestedList.findIndex(matching => matching.targetId === userId) !== -1;
          const heOrSheIsSoloToo = !coupleId;
          const isNotMyFriend = !friends.includes(myId);
          
          return (
            <div key={userId} className="profile-info">
              <div className="profile-nickname"><strong>{nickname}</strong></div>
              {
                isMyLover ?
                  <Emoji text=":profile-couple-emoji:"/>
                  :
                  isRequested ?
                    <div>{type === 'couple' ? '커플' : '친구 '}요청 처리 대기 중</div>
                    :
                    <div className="profile-btn-couple">
                      {
                        iAmSolo && heOrSheIsSoloToo && (
                          <button type="button" className="btn"
                                  onClick={() => requestMatching(userId, nickname, 'couple')}>
                            커플요청
                          </button>
                        )
                      }
                      {
                        isNotMyFriend && (
                          <button type="button" className="btn"
                                  onClick={() => requestMatching(userId, nickname, 'friend')}>
                            친구요청
                          </button>
                        )
                      }
                    </div>
              }
            </div>
          );
        })
      }
    </>
  );
};

export default FriendList;
