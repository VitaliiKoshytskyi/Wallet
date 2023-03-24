import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTransaction, updateTranscation } from 'redux/transaction/transaction-operations';
import { selectAllTransactions, selectCategories } from 'redux/transaction/transaction-selectors';
import Modal from 'shared/components/Modal/Modal';
import AddTransactionForm from 'components/AddTransactionForm/AddTransactionForm';

// import styles from './TransactionsListMobile.module.scss';
import TransactionsListMobileItem from './TransactionsListMobileItem/TransactionsListMobileItem';

const TransactionListMobile = () => {
  const [isEdit, setIsEdit] = useState(false);
  const [transaction, setTransaction] = useState('');
  const [oldAmount, setOldAmount] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const transactions = useSelector(selectAllTransactions);
  const categories = useSelector(selectCategories);

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
    document.body.classList.add('activeBody');
  };

  const handleDeleteBtnClick = id => {
    const data = transactions.find(item => item.id === id);
    dispatch(deleteTransaction(data));
  };

  const onCloseModal = () => {
    setShowModal(false);
    document.body.classList.remove('activeBody');
  };

  const onAddFormSubmit = data => {
    const value = { ...data, oldAmount };
    dispatch(updateTranscation(value));
    setShowModal(false);
    document.body.classList.remove('activeBody');
  };

  const transactionsCopy = [...transactions];

  transactionsCopy.sort((a, b) => {
    const dateA = new Date(a.transactionDate);
    const dateB = new Date(b.transactionDate);
    return dateB.getTime() - dateA.getTime();
  });

  const element = transactionsCopy.map(({ id, transactionDate, type, categoryId, comment, amount }) => {
    const categoryName = categories.find(item => item.id === categoryId);

    return (
      <TransactionsListMobileItem
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

  return (
    <>
      {' '}
      {element}
      {showModal && (
        <Modal onClose={onCloseModal}>
          <AddTransactionForm
            initialState={transaction}
            isEdit={isEdit}
            onSubmit={onAddFormSubmit}
            setShowModal={setShowModal}
          />
        </Modal>
      )}{' '}
    </>
  );
};
export default TransactionListMobile;
