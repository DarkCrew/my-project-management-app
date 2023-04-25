/* eslint-disable no-param-reassign */
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { UserLoginData, UserRegistrationData } from 'core/api/models';
import AuthApi from 'core/rest/AuthApi';

import isExpiredToken from './utils';

type AuthState = {
  isAuth: boolean;
  message: string | null;
  loginStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
  registerStatus: 'idle' | 'pending' | 'succeeded' | 'failed';
};

const initialState: AuthState = {
  isAuth: false,
  loginStatus: 'idle',
  registerStatus: 'idle',
  message: null,
};

export const sendLoginRequest = createAsyncThunk(
  'auth/login',
  async (userData: UserLoginData, { rejectWithValue }) => {
    const response = await AuthApi.signIn(userData);
    return response;
  }
);
export const sendRegisterRequest = createAsyncThunk(
  'auth/register',
  async (userData: UserRegistrationData) => {
    const response = await AuthApi.signUp(userData);
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    changeAuthStatus(state: AuthState, action: PayloadAction<boolean>) {
      state.isAuth = action.payload;
    },
    checkAuth(state: AuthState) {
      const token = localStorage.getItem('project-management-app-token');
      if (!token || isExpiredToken()) {
        console.log('!token || isExpiredToken()');
        state.isAuth = false;
      }
      if (token && !isExpiredToken()) {
        console.log('token && !isExpiredToken()');
        state.isAuth = true;
      }
    },
    clearLoginStatus(state: AuthState) {
      state.loginStatus = 'idle';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendLoginRequest.pending, (state) => {
        state.loginStatus = 'pending';
      })
      .addCase(sendLoginRequest.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.isAuth = true;
        }
        state.loginStatus = 'succeeded';
      })
      .addCase(sendLoginRequest.rejected, (state, action) => {
        // if (action.error.message === 'Request failed with status code 401') {
        //   console.log('GG');
        // }
        // if (action.payload instanceof AxiosError) {
        // }
        state.loginStatus = 'failed';
      })
      // Это для регистрации
      .addCase(sendRegisterRequest.pending, (state) => {
        state.loginStatus = 'pending';
      })
      .addCase(sendRegisterRequest.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.isAuth = true;
        }
        state.loginStatus = 'succeeded';
      })
      .addCase(sendRegisterRequest.rejected, (state, action) => {
        state.loginStatus = 'failed';
      });
  },
});

export const { changeAuthStatus, checkAuth, clearLoginStatus } = authSlice.actions;

export default authSlice.reducer;
