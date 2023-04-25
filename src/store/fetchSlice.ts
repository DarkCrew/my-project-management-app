/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

type Data = { id: string; title: string };
type FetchState = {
  data: Data[];
  status: null | 'idle' | 'pending' | 'succeeded' | 'failed';
};

const initialState: FetchState = {
  data: [],
  status: null,
};

export const fetchTodo = createAsyncThunk('fetch/fetchTodo', async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  return response.data;
});

const fetchExampleSlice = createSlice({
  name: 'fetch',
  initialState,
  reducers: {
    updateData(state, action: PayloadAction<[]>) {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodo.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchTodo.fulfilled, (state, action) => {
        state.data.push(action.payload);
        state.status = 'succeeded';
      })
      .addCase(fetchTodo.rejected, (state) => {
        state.status = 'succeeded';
      });
  },
});
export default fetchExampleSlice.reducer;

export const { updateData } = fetchExampleSlice.actions;
