import { createAsyncThunk } from '@reduxjs/toolkit';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import * as api from 'shared/api/transactions';

export const getAllTransactions = createAsyncThunk('transaction/get', async (_, { rejectWithValue }) => {
  try {
    const { data } = await api.getAllTransactions();
    return data;
  } catch ({ response }) {
    Notify.failure(`Something went wrong, please refresh the page and try again`);
    return rejectWithValue(response);
  }
});

export const addTransaction = createAsyncThunk('transaction/add', async (data, { rejectWithValue }) => {
  try {
    if (data.type === 'EXPENSE') {
      data.amount = '-' + data.amount;
    }
    const { data: result } = await api.addTransaction(data);
    return result;
  } catch ({ response }) {
    Notify.failure(`Incorrect data was entered, there may be a space in the amount`);
    return rejectWithValue(response);
  }
});

export const deleteTransaction = createAsyncThunk('transaction/del', async ( data, { rejectWithValue }) => {
  try {
    await api.deleteTransaction(data.id);
    return data;
  } catch ({ response }) {
    Notify.failure(`Something went wrong, please refresh the page and try again`);
    return rejectWithValue(response);
  }
});

export const updateTranscation = createAsyncThunk('transaction/update', async (transaction, { rejectWithValue }) => {
  try {
    const id = transaction.id;
    const data = {
      transactionDate: transaction.transactionDate,
      type: transaction.type,
      categoryId: transaction.categoryId,
      comment: transaction.comment,
      amount: Number(transaction.amount),
    };
    if (data.type === 'EXPENSE') {
      data.amount = Number('-' + data.amount);
    }
    const { data: result } = await api.updateTranscation(id, data);
    return {...result, oldAmount: transaction.oldAmount};
  } catch ({ response }) {
    Notify.failure(`Incorrect data was entered, there may be a space in the amount`);
    return rejectWithValue(response);
  }
});

export const getAllCategories = createAsyncThunk('transaction/getAllCategories', async (_, { rejectWithValue }) => {
  try {
    const data = await api.getTransactionCategories();
    return data;
  } catch ({ response }) {
    Notify.failure(`Something went wrong, please refresh the page and try again`);
    return rejectWithValue(response);
  }
});
