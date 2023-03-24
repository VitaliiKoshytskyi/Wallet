import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { getAuth } from 'redux/auth/auth-selectors';
import PageLayout from 'components/PageLayout/PageLayout';

const PrivateRouter = () => {
  const { isLogin, token } = useSelector(getAuth);

  if (!isLogin && !token) {
    return <Navigate to="/login" />;
  }

  return (
    <PageLayout>
      <Outlet />
    </PageLayout>
  );
};

export default PrivateRouter;
