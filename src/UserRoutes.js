import { lazy, Suspense } from 'react';
// import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { useNavigate } from 'react-router-dom';

import LoaderPage from 'pages/LoaderPage/LoaderPage';
import PrivateRoute from './modules/PrivateRoute/PrivateRoute';
import PublicRoute from './modules/PublicRoute/PublicRoute';
import useMediaQuery from 'shared/hooks/useMediaQuery';

const HomePage = lazy(() => import('./pages/HomePage/HomePage'));
const StatisticPage = lazy(() => import('./pages/StatisticPage/StatisticPage'));
const RegisterPage = lazy(() => import('./pages/RegisterPage/RegisterPage'));
const LoginPage = lazy(() => import('./pages/LoginPage/LoginPage'));
const Currency = lazy(() => import('./pages/CurrencyPage/CurrencyPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'));

const UserRoutes = () => {
  const isMobile = useMediaQuery('(max-width: 767px)');
//   const navigate = useNavigate();

  // useEffect(() => {
  //   if (!isMobile) {
  //     navigate('/home');
  //   }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isMobile]);

  return (
    <>
      <Suspense fallback={<LoaderPage />}>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          <Route element={<PrivateRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/statistic" element={<StatisticPage />} />
            {isMobile && <Route path="/currency" element={<Currency />} />}
            <Route path="*" element={<HomePage />} />
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </>
  );
};

export default UserRoutes;
