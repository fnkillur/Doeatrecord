import React, {useState} from 'react';
import './Login.scss';

const Login = () => {
  
  const [form, setForm] = useState({
    email: '',
    password: ''
  });
  
  const updateField = e => setForm({
    ...form,
    [e.target.name]: e.target.value
  });
  
  const goToMain = e => {
    e.preventDefault();
    window.location.href = '/main';
  };
  
  return (
    <section className="login">
      <header>
        <span className="title">
          <strong>Do Eat, Record!</strong>
        </span>
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
            <button type="submit" id="btnKakao" className="btn-kakao-login" onClick={goToMain}/>
          </div>
        </form>
      </main>
    </section>
  );
};

export default Login;