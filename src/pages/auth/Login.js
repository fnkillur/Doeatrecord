import React, {useEffect, useRef} from "react";
import "./Login.scss";
import {KAKAO_API_KEY, KAKAO_GET_USER_API} from "../../_common/const";
import {getMe} from "../../_common/utils";

Kakao.init(KAKAO_API_KEY);

const Login = ({history}) => {
  
  const me = getMe();
  me && history.push('/main/search');
  
  const btnEl = useRef(null);
  
  useEffect(() => {
    Kakao.Auth.createLoginButton({
      container: '#kakao-login-container',
      success({access_token: token}) {
        Kakao.API.request({
          url: KAKAO_GET_USER_API,
          success({id, properties: {nickname}}) {
            sessionStorage.setItem('me', JSON.stringify({
              id: id.toString(),
              nickname,
              token
            }));
            history.push('/main/search');
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
  }, [btnEl.current]);
  
  return (
    <main className="login">
      <span className="title">
        <strong>Do Eat, Record!</strong>
      </span>
      <p>기록을 위해서는 로그인이 필요해요!</p>
      <a id="kakao-login-container" ref={btnEl}/>
    </main>
  );
};

export default Login;