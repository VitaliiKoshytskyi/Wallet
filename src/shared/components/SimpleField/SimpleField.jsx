import PropTypes from 'prop-types';
import css from './simple-field.module.scss';

const SimpleField = ({ value = '', centered = false, icon, ...props }) => {
  let fieldClasses = css.field;

  if (icon) {
    fieldClasses = fieldClasses + ' ' + css.iconField;
  }

  if (centered) {
    fieldClasses = fieldClasses + ' ' + css.centered;
  }

  return (
    <div className={css.formGroup}>
      <input className={fieldClasses} value={value} {...props} />
      {icon}
    </div>
  );
};

export default SimpleField;

SimpleField.propTypes = {
  icon: PropTypes.node,
  props: PropTypes.object,
};
