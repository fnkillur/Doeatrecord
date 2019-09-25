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
      thumbnail
      coupleId
      friends
    }
  }
`;

const FriendList = ({myId, isCouple, keyword, requestMatching, goToFriend}) => {
  
  const {loading, error, data} = useQuery(GET_USERS, {variables: {keyword}});
  
  if (loading) return <ClipLoader size={50} color="white"/>;
  if (error) return <>사용자 목록을 가져오는데 실패했어요.<Emoji text=":cry:"/></>;
  
  const {users} = data;
  
  return (
    <>
      {
        users.map(({userId, nickname, thumbnail, coupleId, friends}) => (
          <div key={userId} className="profile-info">
            {
              thumbnail && <img src={thumbnail} className="profile-thumbnail-img" alt=""/>
            }
            <div className="profile-nickname"><strong>{nickname}</strong></div>
            <div className="profile-btn-couple">
              {
                !isCouple && !coupleId && (
                  <button type="button" className="btn" onClick={() => requestMatching(userId, nickname, 'couple')}>
                    커플요청
                  </button>
                )
              }
              {
                coupleId === myId
                  ?
                  null
                  :
                  friends.includes(myId)
                    ?
                    (
                      <button type="button" className="btn" onClick={() => goToFriend(userId)}>
                        구경가기
                      </button>
                    )
                    :
                    (
                      <button type="button" className="btn" onClick={() => requestMatching(userId, nickname, 'friend')}>
                        친구요청
                      </button>
                    )
              }
            </div>
          </div>
        ))
      }
    </>
  );
};

export default FriendList;