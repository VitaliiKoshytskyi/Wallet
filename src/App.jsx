import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from 'redux/store';
import UserRoutes from 'UserRoutes';

import AuthLayout from './modules/AuthLayout/AuthLayout';

import './shared/styles/styles.scss';

export const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthLayout>
            <BrowserRouter basename="/wallet">
              <UserRoutes />
            </BrowserRouter>
          </AuthLayout>
        </PersistGate>
      </Provider>
    </>
  );
};
