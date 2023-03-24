import PropTypes from 'prop-types';
import styles from './edit-button.module.scss';

const EditButton = ({ id, onClick }) => {
  return (
    <button
      className={styles.button}
      onClick={() => {
        onClick(id);
      }}
    >
      <span className={styles.label}>Edit</span>
    </button>
  );
};

export default EditButton;

EditButton.propTypes = {
  id: PropTypes.number,
  onClick: PropTypes.func.isRequired,
}