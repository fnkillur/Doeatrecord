import React, {useEffect, useState} from "react";
import Emoji from "react-emoji-render";
import queryString from "query-string";
import {getMe} from "../../_common/utils";
import SearchBar from "../../components/SearchBar";
import {ClipLoader} from "react-spinners";
import "./Me.scss";

const Me = ({location: {search}, history}) => {
  
  const {nickname, thumbnail_image} = getMe();
  
  const {keyword} = queryString.parse(search);
  const searchKeyword = keyword => history.push(`/main/me${keyword ? `?keyword=${keyword}` : ''}`);
  
  const [friends, setFriends] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(true);
  
  useEffect(() => {
    // TODO: List.js 처럼 useQuery로 User 정보 조회
  }, [keyword]);
  
  return (
    <main className="me">
      <section className="profile-info">
        <img src={thumbnail_image} className="profile-thumbnail-img"/>
        <div className="profile-nickname"><strong>{nickname}</strong>님</div>
        , 환영합니다.<Emoji text=":bow:"/>
      </section>
      <section className="me-search-friends">
        <SearchBar
          keyword={keyword}
          searchKeyword={searchKeyword}
          placeholder="나의 푸드메이트는 누구?"
        />
        <div className="me-search-result">
          {
            isLoading && <ClipLoader size={50} color="white"/>
          }
          {
            isError && <>카카오톡 친구 목록을 가져오는데 실패했어요.<Emoji text=":cry:"/></>
          }
          {
            !isError && !friends.length && <>친구가 없어요...<Emoji text=":cry:"/></>
          }
          {
            friends.map(({id, profile_nickname, profile_thumbnail_image}) => (
              <div className="profile-info">
                <img scr={profile_thumbnail_image} className="profile-thumbnail-img"/>
                <div className="profile-nickname"><strong>{profile_nickname}</strong></div>
              </div>
            ))
          }
        </div>
      </section>
    </main>
  );
};

export default Me;