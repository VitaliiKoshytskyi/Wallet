import { createSlice } from '@reduxjs/toolkit';
import { getTransactionSummary } from './summary-operations';

const initialState = {
  summary: {},
  loading: false,
  error: null,
  balance: 0
};

const handlePending = state => {
  state.loading = true;
  state.error = null;
};

const handleRejected = (state, { payload }) => {
  state.loading = false;
  state.error = payload;
};

const transactionSummary = createSlice ({
  name: 'summary',
  initialState,
  extraReducers: builder => {
    builder
      .addCase(getTransactionSummary.pending, handlePending)
      .addCase(getTransactionSummary.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.summary = payload;
        state.balance = payload.periodTotal;
      })
      .addCase(getTransactionSummary.rejected, handleRejected)
  },
});

export default transactionSummary.reducer;
