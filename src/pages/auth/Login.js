import React, {useState} from 'react';
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
  
  const goToMain = e => {
    e.preventDefault();
    window.location.href = '/main';
  };
  
  return (
    <section className="login">
      <header>
        <h1>Do Eat, Do Record!</h1>
        <p>기록을 위해서는 로그인이 필요해요!</p>
      </header>
      <main>
        <form className="login-form">
          <div className="field">
            <input type="text" name="email" onChange={updateField} value={form.email} placeholder="doEat@google.com"/>
          </div>
          <div className="field">
            <input type="password" name="password" onChange={updateField} value={form.password} placeholder="********"/>
          </div>
          <div className="field">
            <button type="submit" id="btnLogin" className="btn btn-login" onClick={goToMain}>로그인</button>
            <button type="button" id="btnSignUp" className="btn btn-sign-up" onClick={() => alert("아직 구현 중입니다 ㅜㅜ")}>회원가입
            </button>
          </div>
        </form>
      </main>
    </section>
  );
};

export default Login;