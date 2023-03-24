import { useState, useEffect } from 'react';

import { getMoney } from 'shared/api/currency';
import Loader from 'shared/components/Loader/Loader';
import styles from './Currency.module.scss';

const hour = 3600000;

const Currency = () => {
  const [state, setState] = useState(JSON.parse(localStorage.getItem('currency')) ?? []);
  const [error, setError] = useState('');
  const fetchDate = localStorage.getItem('fetchDate') ? JSON.parse(localStorage.getItem('fetchDate')) : null;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading('pending');
        const { data } = await getMoney();
        const newArr = data.slice(0, 2);
        localStorage.setItem('currency', JSON.stringify(newArr));
        setState(newArr);
        setLoading('loaded');
      } catch (response) {
        setError(`Can't get data from server. Please try again later.` || response.message);
        setLoading('reject');
      }
    };

    const timeNow = new Date().getTime();

    if (state.length === 0) {
      fetchData();
      localStorage.setItem('fetchDate', JSON.stringify(new Date().getTime()));
      return;
    }

    if (timeNow > fetchDate + hour) {
      fetchData();
      localStorage.setItem('fetchDate', JSON.stringify(new Date().getTime()));
    }
  }, [state, fetchDate]);

  const elements = state?.map(item => {
    return (
      <li className={styles.item} key={item.currencyCodeA}>
        <p className={styles.heading}>{item.currencyCodeA === 840 ? 'USD' : 'EUR'}</p>
        <p className={styles.heading}>{item.rateBuy.toFixed(2)}</p>
        <p className={styles.heading}>{item.rateSell.toFixed(2)}</p>
      </li>
    );
  });

  return (
    <>
      {loading === 'pending' ? (
        <div className={`${styles.box} ${styles.boxLoader}`}>
          <div className={styles.upperBox}>
            <p className={styles.text}>Currency</p>
            <p className={styles.text}>Purchase</p>
            <p className={styles.text}>Sale</p>
          </div>
          <Loader />
        </div>
      ) : (
        <div className={styles.box}>
          <div className={styles.upperBox}>
            <p className={styles.text}>Currency</p>
            <p className={styles.text}>Purchase</p>
            <p className={styles.text}>Sale</p>
          </div>
          {elements?.length > 0 ? (
            <div className={styles.loverBox}>{elements}</div>
          ) : (
            <>{error && <p className={styles.currencyError}>{error}</p>}</>
          )}
        </div>
      )}
    </>
  );
};

export default Currency;
