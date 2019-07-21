import React, {Fragment, useState} from 'react';
import './Login.scss';

const Login = () => {
  
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  
  const updateField = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };
  
  const goMainPage = () => {
    window.location.href = '/main';
  };
  
  return (
    <Fragment>
      <header className="align-center">
        <h3>Do Eat! Do Record!</h3>
        <p>기록을 위해서는 로그인이 필요해요!</p>
      </header>
      <main className="align-center">
        <input type="text" name="email" onChange={updateField} value={form.email} placeholder="doEat@google.com"/>
        <input type="password" name="password" onChange={updateField} value={form.password} placeholder="********"/>
        <button type="button" onClick={goMainPage}>가자 기록하러!!!</button>
        <button type="button" onClick={() => alert("아직 구현 중입니다 ㅜㅜ")}>나도 가입할래 *_*</button>
      </main>
    </Fragment>
  );
};

export default Login;