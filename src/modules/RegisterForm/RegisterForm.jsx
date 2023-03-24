import PropTypes from 'prop-types';
import TextField from '../../shared/components/TextField/TextField';
import fields from './fields';

import PrimaryButton from 'shared/components/PrimaryButton/PrimaryButton';
import CustomLink from 'shared/components/CustomLink/CustomLink';
import useRegisterValidation from 'shared/hooks/useRegisterValidation';
import PasswordField from 'shared/components/PasswordField/PasswordField';

import { ReactComponent as EmailIcon } from '../../images/svg/email.svg';
import { ReactComponent as PasswordIcon } from '../../images/svg/password.svg';
import { ReactComponent as UserIcon } from '../../images/svg/user.svg';
import logo from '../../images/svg/Group.png';

import css from './register-form.module.scss';

const RegisterForm = ({ onSubmit }) => {
  const {
    email,
    password,
    confirmationPassword,
    username,
    passwordReliability,
    emailError,
    passwordError,
    confirmationPasswordError,
    usernameError,
    setEmail,
    setPassword,
    setConfirmationPassword,
    setUsername,
    validate,
  } = useRegisterValidation();

  const handleSubmit = event => {
    event.preventDefault();
    if (validate()) {
      onSubmit({ email, username, password });
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
          error={emailError}
          onChange={e => setEmail(e.target.value)}
          icon={<EmailIcon />}
          {...fields.email}
        />
        <PasswordField
          value={password}
          error={passwordError}
          passwordReliability={passwordReliability}
          onChange={e => setPassword(e.target.value)}
          icon={<PasswordIcon />}
          {...fields.password}
        />
        <TextField
          value={confirmationPassword}
          error={confirmationPasswordError}
          onChange={e => setConfirmationPassword(e.target.value)}
          icon={<PasswordIcon />}
          {...fields.confirm_password}
        />
        <TextField
          value={username}
          error={usernameError}
          onChange={e => setUsername(e.target.value)}
          icon={<UserIcon />}
          {...fields.username}
        />
      </div>
      <div className={css.buttonsWrapper}>
        <PrimaryButton>register</PrimaryButton>
        <CustomLink to="/login">log in</CustomLink>
      </div>
    </form>
  );
};

export default RegisterForm;

RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
