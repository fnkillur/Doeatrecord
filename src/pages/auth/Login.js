import React, {useEffect, useRef, useState} from "react";
import {useMutation} from "@apollo/react-hooks";
import gql from "graphql-tag";
import Switch from "react-switch";
import {KAKAO_API_KEY, KAKAO_GET_USER_API} from "../../_common/const";
import {getMe} from "../../_common/utils";
import "./Login.scss";

Kakao.init(KAKAO_API_KEY);

const LOGIN = gql`
  mutation ($userId: String!, $nickname: String) {
    createUser(userId: $userId, nickname: $nickname)
  }
`;

const Login = ({history}) => {
  
  const me = getMe();
  me && history.push('/main/search');
  
  const [createUser] = useMutation(LOGIN);
  
  const btnEl = useRef(null);
  useEffect(() => {
    Kakao.Auth.createLoginButton({
      container: '#kakaoLoginContainer',
      success({access_token: token}) {
        Kakao.API.request({
          url: KAKAO_GET_USER_API,
          success: async ({id, properties: {nickname}}) => {
            const myId = id.toString();
            const me = JSON.stringify({
              myId,
              myName: nickname,
              token
            });
  
            if (await createUser({variables: {userId: myId, nickname}})) {
              sessionStorage.setItem('me', me);
              isAuto && localStorage.setItem('me', me);
              history.push('/main/search');
            } else {
              console.error(`Create User Info Error!!! (${id})`);
              alert('사용자 정보를 저장하는데 문제가 있습니다.');
            }
          },
          fail: err => {
            console.error(`Get User Info Error!!!  ${JSON.stringify(err)}`);
            alert('카카오 계정 정보를 가져오는데 문제가 있습니다.');
          }
        });
      },
      fail(errObj) {
        console.error(JSON.stringify(errObj));
        alert('카카오 로그인이 안돼요!!!');
      }
    });
  }, [btnEl.current]);
  
  const [isAuto, setIsAuto] = useState(false);
  
  return (
    <main className="login">
      <span className="login-title">
        <strong>Wechelin!</strong>
      </span>
      <p className="login-notice"><strong>위슐랭</strong>, 우리가 정하는 맛집 점수</p>
      <a id="kakaoLoginContainer" ref={btnEl}/>
      <div className="auto-login">
        <div className="auto-login-title">자동로그인</div>
        <Switch checked={isAuto} onChange={checked => setIsAuto(checked)} onColor="#FFA7C4"/>
      </div>
      {
        isAuto && (
          <p className="app-notice">
            자동로그인은 기기에 로그인 정보를 저장합니다.<br/>
            꼭 <strong>개인 기기</strong>에서만 사용해주세요!<br/>
          </p>
        )
      }
    </main>
  );
};

export default Login;
