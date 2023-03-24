import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction, updateTranscation } from 'redux/transaction/transaction-operations';
import { selectAllTransactions, selectCategories } from 'redux/transaction/transaction-selectors';
import TransactionsListItem from './TransactionsListItem/TransactionsListItem';
import Modal from 'shared/components/Modal/Modal';
import AddTransactionForm from 'components/AddTransactionForm/AddTransactionForm';
import useMediaQuery from 'shared/hooks/useMediaQuery';

import wallet from '../../images/wallett.png';
import styles from './TransactionsList.module.scss';
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';

const TransactionsList = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [transaction, setTransaction] = useState({});
  const [oldAmount, setOldAmount] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const transactions = useSelector(selectAllTransactions);
  const categories = useSelector(selectCategories);

  const isTablet = useMediaQuery('(max-width: 1279px)');
  const isDesktop = useMediaQuery('(min-width: 1280px)');

  const handleEditBtnClick = id => {
    setIsEdit(true);
    const transaction = transactions && transactions.find(item => item.id === id);
    setOldAmount(transaction.amount);
    if (transaction?.amount < 0) {
      setTransaction(() => {
        setTransaction({ ...transaction, amount: transaction.amount * -1 });
      });
    } else {
      setTransaction(transaction);
    }
    setShowModal(true);
  };

  const handleDeleteBtnClick = id => {
    const data = transactions.find(item => item.id === id);
    dispatch(deleteTransaction(data));
  };

  const onCloseModal = () => {
    setShowModal(false);
  };

  const onAddFormSubmit = data => {
    const value = { ...data, oldAmount };
    dispatch(updateTranscation(value));
    setShowModal(false);
  };
  const transactionsCopy = [...transactions];

  transactionsCopy.sort((a, b) => {
    const dateA = new Date(a.transactionDate);
    const dateB = new Date(b.transactionDate);
    return dateB.getTime() - dateA.getTime();
  });

  const element =
    transactionsCopy &&
    transactionsCopy.map(({ id, transactionDate, type, categoryId, comment, amount }) => {
      const categoryName = categories && categories.find(item => item.id === categoryId);
      if (amount && amount < 0) {
        amount = amount * -1;
      }
      return (
        <TransactionsListItem
          key={id}
          id={id}
          category={categoryName}
          sum={amount}
          date={transactionDate}
          type={type}
          comment={comment}
          onEditBtnClick={handleEditBtnClick}
          onDeleteBtnClick={handleDeleteBtnClick}
        />
      );
    });

  const whatToShow =
    transactionsCopy.length === 0 ? (
      <div className={styles.boxNotFound}>
        <p className={styles.titleText}>No Transactions yet</p>
        <p className={styles.textLover}>
          Start transactions with your wallet.All transactions made will be displayed here.
        </p>
        <img src={wallet} alt="no transaction" className={styles.img} />
      </div>
    ) : (
      <div>
        <div className={styles.title}>
          <p>Date</p>
          <p>Type</p>
          <p>Category</p>
          <p>Comment</p>
          <p>Sum</p>
        </div>

        {isTablet && (
          <SimpleBar style={{ maxHeight: '51vh' }}>
            {' '}
            <div className={styles.list_box}>
              <ul className={styles.list}>{element}</ul>
              {showModal && (
                <Modal onClose={onCloseModal}>
                  <AddTransactionForm
                    titleEdit="Edit transaction"
                    initialState={transaction}
                    isEdit={isEdit}
                    onSubmit={onAddFormSubmit}
                    setShowModal={setShowModal}
                  />
                </Modal>
              )}
            </div>
          </SimpleBar>
        )}

        {isDesktop && (
          <SimpleBar
            style={{
              maxHeight: '460px',
            }}
          >
            {' '}
            <div className={styles.list_box}>
              <ul className={styles.list}>{element}</ul>
              {showModal && (
                <Modal onClose={onCloseModal}>
                  <AddTransactionForm
                    titleEdit="Edit transaction"
                    initialState={transaction}
                    isEdit={isEdit}
                    onSubmit={onAddFormSubmit}
                    setShowModal={setShowModal}
                  />
                </Modal>
              )}
            </div>
          </SimpleBar>
        )}
      </div>
    );
  return <> {whatToShow}</>;
};

export default TransactionsList;
