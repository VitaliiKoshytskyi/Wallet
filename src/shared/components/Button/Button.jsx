import PropTypes from 'prop-types';
import css from './button.module.scss';

const Button = ({ type = 'submit', children }) => {
  return (
    <button className={css.btn} type={type}>
      {children}
    </button>
  );
};

export default Button;

Button.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
};
