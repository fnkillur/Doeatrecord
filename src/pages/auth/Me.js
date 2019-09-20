import React, {useState, useEffect} from "react";
import {gql} from "apollo-boost";
import {useQuery, useMutation} from "@apollo/react-hooks";
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

const REQUEST_COUPLE = gql`
  mutation RequestCouple($me: String, $you: String){
    requestCouple(me: $me, you: $you)
  }
`;

const Me = ({location: {search}, history}) => {
	
	const {userId: me, nickname, thumbnail} = getMe();
	
	const {keyword} = queryString.parse(search);
	const searchKeyword = keyword => history.push(`/main/me${keyword ? `?keyword=${keyword}` : ''}`);
	
	const {loading, error, data} = useQuery(GET_USERS, {variables: {keyword}});
	const [requestCouple] = useMutation(REQUEST_COUPLE);
	
	const [you, setYou] = useState('');
	
	useEffect(() => {
		const request = async () => {
			alert('아직 구현중입니다... ㅎㅎㅎ');
			// const result = await requestCouple({
			// 	variables: {
			// 		me, you
			// 	}
			// });
		};
		you && request();
	}, [you]);
	
	return (
		<main className="me">
			<section className="profile-info">
				<img src={thumbnail} className="profile-thumbnail-img"/>
				<div className="profile-nickname"><strong>{nickname}</strong>님,</div>
				환영합니다.<Emoji text=":bow:"/>
			</section>
			<section className="me-search-friends">
				<SearchBar
					keyword={keyword}
					searchKeyword={searchKeyword}
					placeholder="친구들을 검색해보세요."
				/>
				<div className="me-search-result">
					{
						loading
							?
							<ClipLoader size={50} color="white"/>
							:
							error
								?
								<>사용자 목록을 가져오는데 실패했어요.<Emoji text=":cry:"/></>
								:
								data && data.users.length
									?
									data.users.map(({userId, coupleId, nickname, thumbnail}) => (
										<div key={userId} className="profile-info">
											<img src={thumbnail} className="profile-thumbnail-img" alt="썸네일"/>
											<div className="profile-nickname"><strong>{nickname}</strong></div>
											<div className="profile-btn-couple">
												{
													!coupleId &&
													<button type="button" className="btn" onClick={() => setYou(userId)}>커플요청</button>
												}
												<button type="button" className="btn"
												        onClick={() => history.push(`/main/diary/list/${userId}`)}>구경가기
												</button>
											</div>
										</div>
									))
									:
									null
					}
				</div>
			</section>
		</main>
	);
};

export default Me;