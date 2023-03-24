import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from 'shared/api/transactions';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export const getTransactionSummary = createAsyncThunk(
    'summary/get',
    async ({month, year}, { rejectWithValue }) => {
      try {
        const { data } = await api.getTransactionSummary({month, year});
        if(data.expenseSummary < 0) {
            data.expenseSummary = data.expenseSummary * -1;
        }
        return data;
      } catch ({ response }) {
        Notify.failure(`Something went wrong, please refresh the page and try again`);
        return rejectWithValue(response);
      }
    }
  );