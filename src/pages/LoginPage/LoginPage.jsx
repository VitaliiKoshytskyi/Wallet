import { useDispatch } from 'react-redux';
import { useState } from 'react';

import LoginForm from '../../modules/LoginForm/LoginForm';
import { login } from '../../redux/auth/auth-operations';

import imgMan from '../../images/svg/desktop-man.png';

import css from './login-page.module.scss';

const LoginPage = () => {
  const dispatch = useDispatch();
  const [loginError, setLoginError] = useState('');

  const resetLoginError = () => setLoginError('');

  const onLogin = data => {
    dispatch(login(data)).then(data => {
      if (data.payload.statusCode !== 200) {
        setLoginError('Wrong email or password');
      } else {
        resetLoginError();
      }
    });
  };

  return (
    <div className={css.wrapper}>
      <div className={`container ${css.box}`}>
        <div className={css.leftSide}>
          <img className={css.imgLeft} src={imgMan} alt="man" />
          <p className={css.text}>Finance App</p>
        </div>

        <div className={css.rightSide}>
          <span className={css.ellipse}></span>
          <LoginForm onSubmit={onLogin} loginError={loginError} resetLoginError={resetLoginError} />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
