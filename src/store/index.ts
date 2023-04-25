/* =============== using example ===============
 * const dispatch = useAppDispatch(); выплюнули генерируем event
 * const todos = useAppSelector(state => state.todos.list); получаем данные
 * const {isAuth} = useAppSelector(state => state.auth);
 */
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import fetchExampleSlice from './fetchSlice';
import todoReducer from './todoSlice';

const store = configureStore({
  reducer: {
    todos: todoReducer,
    auth: authSlice,
    fetch: fetchExampleSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
//
