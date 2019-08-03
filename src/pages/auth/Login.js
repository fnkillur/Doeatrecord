import React, {useContext, useEffect} from 'react';
import './Login.scss';
import UserContext from '../../contexts/UserContext';
import {KAKAO_API_KEY} from '../../_common/const';
import Kakao from 'kakaojs';

const Login = ({history}) => {
	const {setUser} = useContext(UserContext);
	
	useEffect(() => {
		Kakao.init(KAKAO_API_KEY);
		Kakao.Auth.createLoginButton({
			container: '#kakao-login-container',
			success({access_token: token}) {
				Kakao.API.request({
					url: '/v1/user/me',
					success({id, properties: {nickname}}) {
						setUser({
							id,
							nickname,
							token
						});
						history.push('/main/record');
					},
					fail(err) {
						console.error(`Get User Info Error!!!  ${JSON.stringify(err)}`);
						alert('카카오 계정 정보 가져오는데 문제가 있네요 ㅜㅜ');
					}
				});
			},
			fail(errObj) {
				console.error(JSON.stringify(errObj));
				alert('카카오 로그인이 안돼요!!!');
			}
		});
	}, []);
	
	return (
		<main className="login">
      <span className="title">
        <strong>Do Eat, Record!</strong>
      </span>
			<p>기록을 위해서는 로그인이 필요해요!</p>
			<a id="kakao-login-container"/>
		</main>
	);
};

export default Login;