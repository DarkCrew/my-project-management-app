import React, { ReactElement, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'store';
import { changeAuthStatus } from 'store/authSlice';

import { fetchTodo } from './store/fetchSlice';

const styles = `
  button{
    margin:10px
  }
`;

const TestRedux = (): ReactElement => {
  const auth = useAppSelector((state) => state.auth.isAuth);
  const { data, status } = useAppSelector((state) => state.fetch);

  const dispatch = useAppDispatch();
  function toggleAuth(): void {
    dispatch(changeAuthStatus(!auth));
  }
  function fetchData(): void {
    dispatch(fetchTodo());
  }
  function test(): void {
    // dispatch(increment());
  }

  return (
    <>
      <style>{styles}</style>
      <h1>TestPage</h1>
      <h2>AuthStatus - {auth === false ? 'false' : 'true'}</h2>
      <button type="button" onClick={toggleAuth}>
        toggle auth
      </button>
      <button type="button" onClick={fetchData}>
        fetch data
      </button>
      <button type="button" onClick={test}>
        increment
      </button>
      <h2>Status: {status}</h2>
      <div>
        <p>data:</p>
        <br />
        <p>{data[0]?.id}</p>
        <p>{data[0]?.title}</p>
        {data.map((item) => (
          <>
            <p>{item.id}</p>
            <p>{item.title}</p>
          </>
        ))}
      </div>
    </>
  );
};

export default TestRedux;
