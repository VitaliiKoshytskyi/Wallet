import PropTypes from 'prop-types';
import styles from './secondary-button.module.scss';

const SecondaryButton = ({ children, onBtnClick, ...props }) => {
  return (
    <button className={styles.button} onClick={onBtnClick} {...props}>
      {children}
    </button>
  );
};

export default SecondaryButton;

SecondaryButton.propTypes = {
  children: PropTypes.node.isRequired,
  onBtnClick: PropTypes.func.isRequired,
  props: PropTypes.object,
}

// Приклад використання
// const handleClick = () => {
//   console.log('Click');
// };

// return (
//   <div className="container">
//     <SecondaryButton onClick={handleClick}>ADD</SecondaryButton>
//   </div>
// );
