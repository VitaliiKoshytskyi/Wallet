import PropTypes from 'prop-types';
import TextField from '../../shared/components/TextField/TextField';
import PrimaryButton from 'shared/components/PrimaryButton/PrimaryButton';
import CustomLink from 'shared/components/CustomLink/CustomLink';
import useRegisterValidation from 'shared/hooks/useRegisterValidation';
import fields from './fields';

import logo from '../../images/svg/Group.png';
import { ReactComponent as Email } from '../../images/svg/email.svg';
import { ReactComponent as Password } from '../../images/svg/password.svg';

import css from './login-form.module.scss';

const LoginForm = ({ onSubmit, resetLoginError, loginError = '' }) => {
  const {
    email,
    password,
    emailError,
    localEmailError,
    passwordError,
    localPasswordError,
    setEmail,
    setPassword,
    validate,
  } = useRegisterValidation();

  const handleSubmit = event => {
    event.preventDefault();
    validate();
    if (!localEmailError && !localPasswordError) {
      onSubmit({ email, password });
    } else {
      resetLoginError();
    }
  };

  return (
    <form onSubmit={handleSubmit} className={css.form}>
      <div className={css.logoBox}>
        <img src={logo} alt="logo" width="30" />
        <p className={css.wallet}>Wallet</p>
      </div>
      <div className={css.fieldsWrapper}>
        <TextField
          value={email}
          onChange={e => setEmail(e.target.value)}
          icon={<Email />}
          error={loginError ? loginError : emailError}
          {...fields.email}
        />
        <TextField
          value={password}
          onChange={e => setPassword(e.target.value)}
          icon={<Password />}
          error={loginError ? ' ' : passwordError}
          {...fields.password}
        />
      </div>
      <div className={css.buttonsWrapper}>
        <PrimaryButton>log in</PrimaryButton>
        <CustomLink to="/register">register</CustomLink>
      </div>
    </form>
  );
};

export default LoginForm;

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  error: PropTypes.string,
  resetLoginError: PropTypes.func.isRequired,
};
