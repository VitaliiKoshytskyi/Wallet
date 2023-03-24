import PropTypes from 'prop-types';
import TextField from '../TextField/TextField';
import css from './password-field.module.scss';

const PasswordField = ({ passwordReliability = [], ...props }) => {
  const sum = passwordReliability.reduce((accum, value) => {
    return accum + value;
  }, 0);

  let scaleWidth = Math.ceil((100 / passwordReliability.length) * sum);

  return (
    <div className={css.wrapper}>
      <TextField {...props} />
      <span className={css.scale}>
        <span className={css.filledScale} style={{ width: `calc(${scaleWidth}% + 4px` }}></span>
      </span>
    </div>
  );
};

export default PasswordField;

PasswordField.propTypes = {
  passwordReliability: PropTypes.array,
  props: PropTypes.object,
}