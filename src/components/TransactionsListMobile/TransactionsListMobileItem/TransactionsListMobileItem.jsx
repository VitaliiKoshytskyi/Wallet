import PropTypes from 'prop-types';
import EditButton from 'shared/components/EditButton/EditButton';
import DeleteButton from 'shared/components/DeleteButton/DeleteButton';

import styles from './TransactionsListMobileItem.module.scss';
import numeral from 'numeral';


const TransactionsListMobileItem = ({ id, category, sum, date, type, comment, onEditBtnClick, onDeleteBtnClick }) => {
  const newSum = numeral(sum).format('0,00.00').replaceAll(",","\u00A0")
  const Newdate = new Date(date);
const day = Newdate.getDate().toString().padStart(2, '0');
const month = (Newdate.getMonth() + 1).toString().padStart(2, '0');
const year = Newdate.getFullYear().toString().slice(-2);
const formattedDate = `${day}.${month}.${year}`;
  const typeOfTrans = type === 'INCOME' ? '+' : '-';
  return (
    <div className={styles.box}>
      <table className={styles.table}>
        <tbody className={styles.tbody}>
          <tr className={typeOfTrans==='+'?styles.green:styles.red}>
            <td className={styles.head}>Date</td>
            <td className={styles.body}>{formattedDate}</td>
          </tr>
          <tr className={typeOfTrans==='+'?styles.green:styles.red}>
            <td className={styles.head}>Type</td>
            <td className={styles.body}>{typeOfTrans}</td>
          </tr>
          <tr className={typeOfTrans==='+'?styles.green:styles.red}>
            <td className={styles.head}>Category</td>
            <td className={styles.body}>{category?.name?category.name:'unknown'}</td>
          </tr>
          <tr className={typeOfTrans==='+'?styles.green:styles.red}>
            <td className={styles.head}>Comment</td>
            <td className={styles.body}>{comment}</td>
          </tr>
          <tr className={typeOfTrans==='+'?styles.green:styles.red}>
            <td className={styles.head}>Sum</td>
            <td className={typeOfTrans==='+'?styles.greenSum:styles.redSum}>{newSum}</td>
          </tr>

          <tr className={typeOfTrans==='+'?styles.green:styles.red}>
            <td className={styles.head}>
                 <DeleteButton onClick={() => onDeleteBtnClick(id)} />
            </td>
            <td className={styles.body}>
              <div className={styles.editBox}>
                <EditButton onClick={() => onEditBtnClick(id)} />
                {/* <span onClick={() => onEditBtnClick(id)} className={styles.edit}>Edit</span> */}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TransactionsListMobileItem;

TransactionsListMobileItem.propTypes = {
  id: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired,
  sum: PropTypes.number.isRequired,
  date: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  onEditBtnClick: PropTypes.func.isRequired,
  onDeleteBtnClick: PropTypes.func.isRequired,
}