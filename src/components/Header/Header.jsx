import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUser } from '../../redux/auth/auth-selectors';
import { useState } from 'react';
import { logout } from '../../redux/auth/auth-operations';
import Modal from 'shared/components/Modal/Modal';
import logo from '../../images/svg/Group.png';
import vector from '../../images/svg/Vector.svg';
import exit from '../../images/svg/exit.svg';

import styles from './Header.module.scss';

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <header className={styles.header__container}>
      <div className="container">
        <div className={styles.containerInner}>
          <Link to="/home" className={styles.logoBox}>
            <img className={styles.img__wallet} src={logo} width="30" height="30" alt="" />
            <p className={styles.text__wallet}>Wallet</p>
          </Link>
          <div className={styles.exitBox}>
            <p className={styles.name}>{user.username}</p>
            <img className={styles.vector} src={vector} height="30" alt="" />
            <img onClick={toggleModal} className={styles.exit} src={exit} alt="" />
            <button onClick={toggleModal} className={styles.button} type="button">
              Exit
            </button>
          </div>
          {showModal && (
            <Modal onClose={toggleModal}>
              <div className={styles.modal__wrapper}>
                <p className={styles.question}> Are you sure you want to exit ?</p>
                <div className={styles.button__wrapper}>
                  <button className={styles.button__question} onClick={onLogout}>
                    yes
                  </button>

                  <button className={styles.button__question} onClick={toggleModal}>
                    no
                  </button>
                </div>
              </div>
            </Modal>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
