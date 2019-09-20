import React, {useEffect, useRef} from "react";
import Emoji from "react-emoji-render";
import {KAKAO_API_KEY, KAKAO_GET_USER_API} from "../../_common/const";
import {getMe} from "../../_common/utils";
import "./Login.scss";

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
          success({id, properties: {nickname, thumbnail_image}}) {
            sessionStorage.setItem('me', JSON.stringify({
              userId: id.toString(),
              nickname,
              token,
              thumbnail: thumbnail_image || ''
            }));
            history.push('/register');
          },
          fail(err) {
            console.error(`Get User Info Error!!!  ${JSON.stringify(err)}`);
            alert('카카오 계정 정보를 가져오는데 문제가 있네요 ㅜㅜ');
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
      <span className="login-title">
        <strong>Do Eat, Record!</strong>
      </span>
      <p className="login-notice">기록을 위해서는 로그인이 필요해요<Emoji text=":)"/></p>
      <a id="kakao-login-container" ref={btnEl}/>
      
      <p className="app-notice">
        모바일 브라우저<Emoji text=":iphone:"/>에서 보시는게 가장 편해요!<br/>
        개인 프로젝트라서 아직 미흡한 부분이 많이 있어요<Emoji text=":sweat_smile:"/><br/><br/>
        불편하신 부분이 있으시면<br/>
        카카오톡으로 메세지<Emoji text=":incoming_envelope:"/> 주세요!<br/>
        최대한 반영해드릴게요!<br/>
        
        <Emoji text=" :rice:"/><Emoji text=":runner:"/><Emoji text=":woman-running:"/><br/><br/><br/>
        카카오톡 ID: fnkillur
      </p>
    </main>
  );
};

export default Login;