import React, {useEffect, useRef, useState} from "react";
import Emoji from "react-emoji-render";
import Switch from "react-switch";
import {toast} from "react-toastify";
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
            const me = JSON.stringify({
              myId: id.toString(),
              myName: nickname,
              token,
              thumbnail: thumbnail_image || ''
            });
            localStorage.setItem('me', me);
            sessionStorage.setItem('me', me);
            history.push('/main/search');
          },
          fail(err) {
            console.error(`Get User Info Error!!!  ${JSON.stringify(err)}`);
            toast.error('카카오 계정 정보를 가져오는데 문제가 있습니다.');
          }
        });
      },
      fail(errObj) {
        console.error(JSON.stringify(errObj));
        toast.error('카카오 로그인이 안돼요!!!');
      }
    });
  }, [btnEl.current]);
  
  const [isAuto, setIsAuto] = useState(false);
  
  useEffect(() => {
    isAuto && toast.warn('자동 로그인 사용 시 해당 기기에서 DoEat Record 접속 시 항상 같은 계정으로 로그인이 됩니다.');
  }, [isAuto]);
  
  return (
    <main className="login">
      <span className="login-title">
        <strong>Do Eat, Record!</strong>
      </span>
      <p className="login-notice">기록을 위해서는 로그인이 필요해요<Emoji text=":)"/></p>
      <a id="kakao-login-container" ref={btnEl}/>
      <div className="auto-login">
        <div className="auto-login-title">자동로그인</div>
        <Switch checked={isAuto} onChange={checked => setIsAuto(checked)} onColor="#FFA7C4"/>
      </div>
      <p className="app-notice">
        모바일 브라우저<Emoji text=":iphone:"/>에서 보시는게 가장 편해요!<br/><br/>
        자동로그인은 기기에 로그인 정보를 저장합니다.<br/>
        꼭 <strong>개인 기기</strong>에서만 사용해주세요!<br/>
      </p>
    </main>
  );
};

export default Login;