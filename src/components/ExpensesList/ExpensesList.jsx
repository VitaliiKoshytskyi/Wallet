import PropTypes from 'prop-types';
import ExpensesListItem from './ExpensesListItem/ExpensesListItem';
import numeral from 'numeral';

import styles from './ExpensesList.module.scss';

const ExpensesList = ({ data = [], incomeSum = 0, expenseSum = 0 }) => {
  const element = data.map(item => (
    <ExpensesListItem key={item.id} category={item.name} sum={item.value} color={item.color} />
  ));

  return (
    <div>
      <div className={styles.title}>
        <p className={styles.heading}>Category</p>
        <p  className={styles.heading}>Sum</p>
      </div>
      <div className={styles.list_box}>
        <ul className={styles.list}>{element}</ul>
        <div className={styles.expenses}>
          <p className={styles.textE}>Expenses:</p>
          <span className={styles.expensesText}>{numeral(expenseSum).format('0,00.00').replaceAll(",","\u00A0")}</span>
        </div>
        <div className={styles.income}>
          <p className={styles.textI}>Income:</p>
          <span className={styles.incomeText}>{numeral(incomeSum).format('0,00.00').replaceAll(",","\u00A0")}</span>
        </div>
      </div>
    </div>
  );
};

export default ExpensesList;

ExpensesList.propTypes = {
  data: PropTypes.array.isRequired,
  incomeSum: PropTypes.number,
  expenseSum: PropTypes.number,
};
