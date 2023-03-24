import PropTypes from 'prop-types';
import css from './text-field.module.scss';

const TextField = ({ value = '', label = '', icon = null, error = null, ...props }) => {
  let fieldClasses = css.field;

  if (icon) {
    fieldClasses = fieldClasses + ' ' + css.iconField;
  }

  if (error) {
    fieldClasses = fieldClasses + ' ' + css.invalid;
  } else if (value.length) {
    fieldClasses = fieldClasses + ' ' + css.filled;
  }

  return (
    <div className={css.wrapper}>
      <div className={css.formGroup}>
        <input className={fieldClasses} value={value} placeholder={label} {...props} />
        {icon}
      </div>
      {error && <p className={css.hint}>{error}</p>}
    </div>
  );
};

export default TextField;

TextField.propTypes = {
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  icon: PropTypes.node.isRequired,
  error: PropTypes.string,
  props: PropTypes.object,
};
