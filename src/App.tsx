/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable import/no-unresolved */
import React, { ReactElement, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import RequireAuth from 'core/hocs/RequireAuth';
import BoardPage from 'pages/BoardPage/BoardPage';
import HomePage from 'pages/HomePage/HomePage';
import MainPage from 'pages/MainPage/MainPage';
import NotfoundPage from 'pages/NotFoundPage/NotFoundPage';
import ProfilePage from 'pages/ProfilePage/ProfilePage';
import LoginPage from 'pages/SignInPage/SignInPage';
import SignUpPage from 'pages/SignUpPage/SignUpPage';
import { useAppDispatch, useAppSelector } from 'store';
import { checkAuth, sendLoginRequest } from 'store/authSlice';
import TestRedux from 'TempRedux';

import Layout from 'components/Layout/Layout';

import './App.css';
import './styles/normalize.css';
import './styles/index.scss';

const App = (): ReactElement => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (isAuth) {
    if (pathname === '/signin' || pathname === '/signup') {
      navigate('/');
    }
  }

  useEffect(() => {
    dispatch(checkAuth());
    // dispatch(sendLoginRequest({ login: 'Ilo7776', password: 'qwerty123' }));
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />

        <Route path="test" element={<TestRedux />} />
        <Route path="signin" element={<LoginPage />} />
        <Route path="signup" element={<SignUpPage />} />
        <Route
          path="profile"
          element={
            <RequireAuth>
              <ProfilePage />
            </RequireAuth>
          }
        />
        <Route
          path="main"
          element={
            <RequireAuth>
              <MainPage />
            </RequireAuth>
          }
        />
        <Route
          path="board/:id"
          element={
            <RequireAuth>
              <BoardPage />
            </RequireAuth>
          }
        />

        <Route path="*" element={<NotfoundPage />} />
      </Route>
    </Routes>
  );
};

export default App;
