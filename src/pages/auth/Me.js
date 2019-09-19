import React, {useEffect} from "react";
import {gql} from "apollo-boost";
import {useQuery} from "@apollo/react-hooks";
import Emoji from "react-emoji-render";
import queryString from "query-string";
import {getMe} from "../../_common/utils";
import SearchBar from "../../components/SearchBar";
import {ClipLoader} from "react-spinners";
import "./Me.scss";

const GET_USERS = gql`
  query Users($keyword: String) {
    users(keyword: $keyword) {
      userId
      coupleId
      nickname
      thumbnail
    }
  }
`;

const Me = ({location: {search}, history}) => {
  
  const {nickname, thumbnail_image} = getMe();
  
  const {keyword} = queryString.parse(search);
  const searchKeyword = keyword => history.push(`/main/me${keyword ? `?keyword=${keyword}` : ''}`);
  
  const {loading, error, data, fetchMore} = useQuery(GET_USERS, {variables: {keyword}});
  
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
            loading && <ClipLoader size={50} color="white"/>
          }
          {
            error && <>사용자 목록을 가져오는데 실패했어요.<Emoji text=":cry:"/></>
          }
          {
            !loading && !error && data && data.users.map(({userId, coupleId, nickname, thumbnail}) => (
              <div key={userId} className="profile-info">
                <img src={thumbnail} className="profile-thumbnail-img" alt="썸네일"/>
                <div className="profile-nickname"><strong>{nickname}</strong></div>
              </div>
            ))
          }
        </div>
      </section>
    </main>
  );
};

export default Me;