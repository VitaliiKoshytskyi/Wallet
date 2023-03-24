import PropTypes from 'prop-types';
import styles from './primary-button.module.scss';

const PrimaryButton = ({ children, ...props }) => {
  return (
    <button className={styles.button} {...props}>
      {children}
    </button>
  );
};

export default PrimaryButton;

PrimaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  props: PropTypes.object,
}

// Приклад використання
// const handleClick = () => {
//   console.log('Click');
// };

// return (
//   <div className="container">
//     <PrimaryButton onClick={handleClick}>ADD</PrimaryButton>
//   </div>
// );
