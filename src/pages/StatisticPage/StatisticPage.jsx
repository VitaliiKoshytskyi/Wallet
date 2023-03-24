import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories, getAllTransactions } from 'redux/transaction/transaction-operations';
import { getTransactionSummary } from 'redux/summary/summary-operations';
import { selectCategories } from 'redux/transaction/transaction-selectors';
import {
  selectCategoriesSummary,
  selectIncomeSummary,
  selectExpenseSummary,
  selectPeriodTotal,
} from 'redux/summary/summary-selectors';
import { COLORS } from 'shared/data/colors';
import PieChartComponent from 'components/PageLayout/ChartDiagram/ChartDiagram';
import MonthCalendar from 'components/MonthCalendar/MonthCalendar';
import YearsCalendar from 'components/YearsCalendar/YearsCalendar';
import ExpensesList from 'components/ExpensesList/ExpensesList';
import Loader from 'shared/components/Loader/Loader';

import css from './statistic-page.module.scss';

const StatisticPage = () => {
  const dispatch = useDispatch();
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear())

  const categories = useSelector(selectCategories);
  const categoriesSummary = useSelector(selectCategoriesSummary);
  const incomeSummary = useSelector(selectIncomeSummary);
  const expenseSummary = useSelector(selectExpenseSummary);
  const periodTotal = useSelector(selectPeriodTotal);

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllTransactions());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getTransactionSummary({ month, year }));
  }, [dispatch, month, year]);

  if (!categories) {
    return <Loader />;
  }

  const onMonthChange = (value) => {
    setMonth(value);
  }

  const onYearChange = (value) => {
    setYear(value);
  }

  const categoriesWhithoutIncome = categories && categories.filter(item => item.name !== 'Income');
  const categoriesColors = categoriesWhithoutIncome.map((elem, index) => ({
    id: elem.id,
    name: elem.name,
    color: COLORS[index],
  }));
  const filteredCategoriesSummary = categoriesSummary && categoriesSummary.filter(item => item.type !== 'INCOME');
  const data =
    categoriesColors &&
    categoriesColors.map(item => {
      const value = filteredCategoriesSummary && filteredCategoriesSummary.find(elem => elem.name === item.name);
      if (value) {
        return { ...item, value: value.total * -1 };
      }
      return { ...item, value: 0 };
    });

  return ( <>
      <div className={css.wrapper}>
        <h2 className={css.titleStats}>Statistics</h2>

        <div className={css.innerBox}>
          <PieChartComponent data={data} totalSum={periodTotal} expense={expenseSummary} />
          <div className={css.box}>
            <div className={css.innerBox}>
              <div className={css.month}>
                {' '}
                <MonthCalendar onChange={onMonthChange} />
              </div>
              <YearsCalendar onChange={onYearChange} />
            </div>
            <ExpensesList data={data} incomeSum={incomeSummary} expenseSum={expenseSummary} />
          </div>
        </div>
      </div>
  </>
  );
};

export default StatisticPage;
