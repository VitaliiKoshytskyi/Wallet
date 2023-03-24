import { useDispatch } from 'react-redux';

import RegisterForm from 'modules/RegisterForm/RegisterForm';
import { register } from '../../redux/auth/auth-operations';

import imgWoman from '../../images/svg/desktop-woman.png';

import css from './register-page.module.scss';

const RegisterPage = () => {
  const dispatch = useDispatch();

  const onRegister = data => {
    dispatch(register(data));
  };

  return (
    <div className={css.wrapper}>
      <div className={`container ${css.box}`}>
        <div className={css.leftSide}>
          <img className={css.imgLeft} src={imgWoman} alt="man" />
          <p className={css.text}>Finance App</p>
        </div>

        <div className={css.rightSide}>
          <span className={css.ellipse}></span>
          <RegisterForm onSubmit={onRegister} />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
