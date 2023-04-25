import React, { ReactElement, useEffect } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { checkAuth } from 'store/authSlice';

const RequireAuth = ({ children }: { children: JSX.Element }): ReactElement => {
  const { isAuth } = useAppSelector((state) => state.auth);
  // TODO get auth status
  const location = useLocation();
  console.log('RequireAuth');
  // useEffect(() => {
  //   console.log('isAuth wass changed');
  // }, [isAuth]);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  useEffect(() => {
    dispatch(checkAuth());
    if (isAuth) nav(location);
  }, [isAuth]);
  if (!isAuth) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  return children;
};
export default RequireAuth;
