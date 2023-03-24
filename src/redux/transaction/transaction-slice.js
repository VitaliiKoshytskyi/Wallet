import { createSlice } from '@reduxjs/toolkit';

import {
  getAllTransactions,
  addTransaction,
  deleteTransaction,
  updateTranscation,
  getAllCategories,
} from './transaction-operations';

const initialState = {
  items: [],
  loading: false,
  error: null,
  summary: {},
  categories: [],
  balance: 0,
};

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

const transactionSlice = createSlice({
  name: 'transaction',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getAllTransactions.pending, handlePending)
      .addCase(getAllTransactions.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = payload;
        state.balance = payload.reduce((total, elem) => {
          return total += elem.amount;
        }, 0)
      })
      .addCase(getAllTransactions.rejected, handleRejected)

      .addCase(addTransaction.pending, handlePending)
      .addCase(addTransaction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items.push(payload);
        state.balance = state.balance + payload.amount;
      })
      .addCase(addTransaction.rejected, handleRejected)

      .addCase(deleteTransaction.pending, handlePending)
      .addCase(deleteTransaction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.items = state.items.filter(({ id }) => id !== payload.id);
        state.balance = state.balance - payload.amount;
      })
      .addCase(deleteTransaction.rejected, handleRejected)

      .addCase(updateTranscation.pending, handlePending)
      .addCase(updateTranscation.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.items = state.items.map(transaction => (transaction.id === payload.id ? payload : transaction));
        state.balance = state.balance - payload.oldAmount;
        state.balance = state.balance + payload.amount;
      })
      .addCase(updateTranscation.rejected, handleRejected)

      .addCase(getAllCategories.pending, handlePending)
      .addCase(getAllCategories.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.categories = payload;
      })
      .addCase(getAllCategories.rejected, handleRejected);
  },
});

export default transactionSlice.reducer;
