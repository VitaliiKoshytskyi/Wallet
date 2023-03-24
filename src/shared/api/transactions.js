import instanceAuth from './auth';

export const getAllTransactions = async () => instanceAuth.get('/transactions');

export const addTransaction = data => instanceAuth.post('/transactions', data);

export const deleteTransaction = id => instanceAuth.delete(`/transactions/${id}`);

export const updateTranscation = (id, data) => instanceAuth.patch(`/transactions/${id}`, data);

export const getTransactionCategories = async () => {
  const data = await instanceAuth.get('/transaction-categories');
  return data.data;
};

export const getTransactionSummary = ({month, year}) => instanceAuth.get(`/transactions-summary?month=${month}&year=${year}`);
