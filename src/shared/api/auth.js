import axios from 'axios';

const instanceAuth = axios.create({
  baseURL: 'https://wallet.goit.ua/api',
});

const setToken = token => {
  if (token) {
    return (instanceAuth.defaults.headers.authorization = `Bearer ${token}`);
  }
  instanceAuth.defaults.headers.authorization = '';
};

export const register = async data => {
  const { data: result } = await instanceAuth.post('/auth/sign-up', data);
  setToken(result.token);
  return result;
};

export const login = async data => {
  const { data: result } = await instanceAuth.post('/auth/sign-in', data);
  setToken(result.token);
  return result;
};

export const logout = async () => {
  const { data } = await instanceAuth.delete('/auth/sign-out');
  setToken();
  return data;
};

export const getCurrent = async token => {
  try {
    setToken(token);
    const { data } = await instanceAuth.get('/users/current');
    return data;
  } catch (error) {
    setToken();
    throw error;
  }
};

export default instanceAuth;
