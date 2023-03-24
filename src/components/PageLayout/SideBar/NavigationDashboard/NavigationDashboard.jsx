import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeIcon } from 'images/svg/home.svg';
import { ReactComponent as DiagramaIcon } from 'images/svg/diagrama.svg';
import { ReactComponent as CurrencyIcon } from 'images/svg/currency.svg';
import s from './NavigationDashboard.module.scss';

const NavigationDashboard = () => {
  return (
    <ul className={s.list}>
      <li className={s.item}>
        <NavLink to="/home" className={s.link}>
          <HomeIcon className={s.svg} />
          <span>Home</span>
        </NavLink>
      </li>
      <li className={s.item}>
        <NavLink to="/statistic" className={s.link}>
          <DiagramaIcon className={s.svg} />
          <span>Statistics</span>
        </NavLink>
      </li>
      <li className={`${s.item} ${s.displayNone}`}>
        <NavLink to="/currency" className={s.link}>
          <CurrencyIcon className={s.svg} />
          <span>Statistics</span>
        </NavLink>
      </li>
    </ul>
  );
};

export default NavigationDashboard;
