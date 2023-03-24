import PropTypes from 'prop-types';
import EditButton from 'shared/components/EditButton/EditButton';
import DeleteButton from 'shared/components/DeleteButton/DeleteButton';

import styles from './TransactionsListItem.module.scss';
import numeral from 'numeral';

const TransactionsListItem = ({ id, category, sum, date, type, comment, onEditBtnClick, onDeleteBtnClick }) => {
  const formattedNumber = numeral(sum).format('0,00.00').replaceAll(',', '\u00A0');

  const typeOfTrans = type === 'INCOME' ? '+' : '-';
  const Newdate = new Date(date);
  const day = Newdate.getDate().toString().padStart(2, '0');
  const month = (Newdate.getMonth() + 1).toString().padStart(2, '0');
  const year = Newdate.getFullYear().toString().slice(-2);
  const formattedDate = `${day}.${month}.${year}`;
  return (
    <li className={styles.item}>
      <div className={styles.leftBox}>
        <div>
          <p className={styles.date}>{formattedDate}</p>
        </div>
        <div>
          <p className={styles.type}>{typeOfTrans}</p>
        </div>
        <div>
          <p className={styles.category}> {category?.name ? category.name : 'Unknown'}</p>
        </div>
        <div>
          <p className={styles.comment}>{comment}</p>
        </div>
      </div>
      <div className={styles.sum}>
        <span className={typeOfTrans === '+' ? styles.greenSum : styles.redSum}>{formattedNumber}</span>
      </div>
      <div className={styles.rightBox}>
        <EditButton onClick={() => onEditBtnClick(id)} />
        <DeleteButton onClick={() => onDeleteBtnClick(id)} />
      </div>
    </li>
  );
};

export default TransactionsListItem;

TransactionsListItem.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.object,
  sum: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  onEditBtnClick: PropTypes.func.isRequired,
  onDeleteBtnClick: PropTypes.func.isRequired,
};
