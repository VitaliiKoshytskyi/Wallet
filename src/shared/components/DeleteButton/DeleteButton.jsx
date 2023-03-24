import PropTypes from 'prop-types';
import styles from './delete-button.module.scss';

const DeleteButton = ({ id, onClick }) => {
  return (
    <button
      className={styles.button}
      onClick={e => {
        onClick(id);
      }}
    >
      Delete
    </button>
  );
};

export default DeleteButton;

DeleteButton.propTypes = {
  id: PropTypes.string,
  onClick: PropTypes.func.isRequired,
}

// Приклад використання
// const handleDelete = id => {
//   console.log('Deleted ' + id);
// };

// <div className="container">
//   <DeleteButton id={'1'} onClick={handleDelete} />;
// </div>;
