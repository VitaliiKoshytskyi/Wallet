import PropTypes from 'prop-types';
import styles from './ExpensesListItem.module.scss';
import numeral from 'numeral';

const ExpensesListItem = ({ category, sum, color }) => {
  return (
    <li className={styles.item}>
      <div className={styles.box}>
        <span className={styles.block} style={{ backgroundColor: color }}></span>
        <p className={styles.category}>{category}</p>
      </div>
      <span className={styles.sum}>{numeral(sum).format('0,00.00').replaceAll(",","\u00A0")}</span>
    </li>
  );
};
export default ExpensesListItem;

ExpensesListItem.propTypes = {
  category: PropTypes.string.isRequired,
  sum: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
