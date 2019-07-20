import React, {Fragment} from 'react';
import './Login.scss';

const Login = () => {
  return (
    <Fragment>
      <header className="align-center">
        <h3>Do Eat! Do Record!</h3>
        <p>기록을 위해서는 로그인이 필요해요!</p>
      </header>
      <main className="align-center">
        <input type="text" name="email" placeholder="doEat@google.com"/>
        <input type="password" name="password" placeholder="********"/>
        <button>가자 기록하러!!!</button>
        <button>나도 가입할래 *_*</button>
      </main>
    </Fragment>
  );
};

export default Login;