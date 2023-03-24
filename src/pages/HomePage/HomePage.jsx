import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addTransaction, getAllCategories, getAllTransactions } from 'redux/transaction/transaction-operations';
import AddButton from 'shared/components/AddButton/AddButton';
import Modal from 'shared/components/Modal/Modal';
import AddTransactionForm from 'components/AddTransactionForm/AddTransactionForm';
import css from './home-page.module.scss';
import TransactionsList from 'components/TransactionsList/TransactionsList';
import TransactionListMobile from 'components/TransactionsListMobile/TransactionsListMobile';
import useMediaQuery from 'shared/hooks/useMediaQuery';
import Balance from 'components/PageLayout/SideBar/Balance/Balance';

const HomePage = () => {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllCategories());
    dispatch(getAllTransactions());
  }, [dispatch]);

  const handleAddBtnClick = () => {
    setShowModal(true);
    document.body.classList.add('activeBody');
  };

  const onCloseModal = () => {
    setShowModal(false);
    document.body.classList.remove('activeBody');
  };

  const onAddFormSubmit = data => {
    dispatch(addTransaction(data));
    setShowModal(false);
    document.body.classList.remove('activeBody');
  };

  const isTablet = useMediaQuery('(min-width: 768px)');
  const isMobile = useMediaQuery('(max-width: 767px)');

  return (
    <div className={css.wrap}>
      {isMobile && <AddButton type="button" onBtnClick={handleAddBtnClick} />}
      <div className={css.wrapper}>
        {isTablet && <AddButton type="button" onBtnClick={handleAddBtnClick} />}
        {isMobile && <Balance />}

        {isTablet && <TransactionsList setShowModal={setShowModal} />}
        {isMobile && <TransactionListMobile />}
        {showModal && (
          <Modal onClose={onCloseModal}>
            <AddTransactionForm onSubmit={onAddFormSubmit} setShowModal={setShowModal} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default HomePage;
