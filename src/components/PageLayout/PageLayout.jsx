import PropTypes from 'prop-types';
import React from 'react';
import Header from 'components/Header/Header';
import SideBar from './SideBar/SideBar';
import s from './page-layout.module.scss';

const PageLayout = ({ children }) => {
  return (
    <div className={s.pageLayoutWrapper}>
      <Header />
      <div className={s.pageLayoutWrapperInner}>
        <div className={`container ${s.pageLayoutContainer}`}>
          <div className={s.wrapper}>
            <SideBar />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLayout;

PageLayout.propTypes = {
  children: PropTypes.node.isRequired,
}