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

const FriendList = ({me, keyword, requestCouple, requestFriend, goToFriend}) => {
  
  const {loading, error, data} = useQuery(GET_USERS, {variables: {keyword}});
  
  if (loading) return <ClipLoader size={50} color="white"/>;
  if (error) return <>사용자 목록을 가져오는데 실패했어요.<Emoji text=":cry:"/></>;
  
  const {users} = data;
  
  return (
    <>
      {
        users.map(({userId, nickname, thumbnail, coupleId, friends}) => (
          <div key={userId} className="profile-info">
            <img src={thumbnail} className="profile-thumbnail-img" alt="썸네일"/>
            <div className="profile-nickname"><strong>{nickname}</strong></div>
            <div className="profile-btn-couple">
              {
                !coupleId && (
                  <button type="button" className="btn" onClick={() => requestCouple(userId)}>
                    커플요청
                  </button>
                )
              }
              {
                friends.includes(me)
                  ?
                  (
                    <button type="button" className="btn" onClick={() => goToFriend(userId)}>
                      구경가기
                    </button>
                  )
                  :
                  (
                    <button type="button" className="btn" onClick={() => requestFriend(userId)}>
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