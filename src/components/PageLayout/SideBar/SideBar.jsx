import React from 'react';
import Balance from './Balance/Balance';
import Currency from './Currency/Currency';
import NavigationDashboard from './NavigationDashboard/NavigationDashboard';
import s from './SideBar.module.scss';

import useMediaQuery from 'shared/hooks/useMediaQuery';

const SideBar = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
  return (
    <div className={s.wrapper}>
      <div className={s.navPlusBalanceBox}>
        <NavigationDashboard />
        {!isMobile && <Balance />}
      </div>
      {!isMobile && <Currency />}
    </div>
  );
};

export default SideBar;
