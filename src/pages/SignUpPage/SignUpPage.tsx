/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'store';
import { clearLoginStatus, sendRegisterRequest } from 'store/authSlice';

import Loader from 'components/Loader/Loader';

import signImage from '../../assets/images/registration.png';

import styles from './SignUpPage.module.scss';

const SignUpPage = (): ReactElement => {
  const navigate = useNavigate();
  const navState = useLocation().state;
  const dispatch = useAppDispatch();
  const [login, setLogin] = useState('');
  const { message, loginStatus } = useAppSelector((state) => state.auth);

  const handleSuccessSubmit = (): void => {
    // TODO redux global state isAuth = thue
    if (navState !== null && navState.from) {
      navigate(navState.from);
    } else navigate('/');
  };
  interface IFormInput {
    name: string;
    login: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  useEffect(() => {
    if (loginStatus === 'succeeded') {
      handleSuccessSubmit();
      dispatch(clearLoginStatus());
      localStorage.setItem('user', login);
    }
  }, [loginStatus]);

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput): void => {
    setLogin(data.login);
    dispatch(sendRegisterRequest({ name: data.name, login: data.login, password: data.password }));
  };

  return (
    <>
      {loginStatus === 'pending' && <Loader />}
      <section className={styles.signup}>
        <div className="container">
          <div className={styles.container}>
            <div className={styles.mainContainer}>
              <form className={styles.inputData} onSubmit={handleSubmit(onSubmit)}>
                <p className={styles.title}>Register your account</p>
                <div className={styles.inputContainer}>
                  <input
                    {...register('name', {
                      required: 'Required field',
                      minLength: {
                        value: 3,
                        message: 'Name should contain minimum 3 symbols',
                      },
                      maxLength: {
                        value: 15,
                        message: 'Name should contain maximum 15 symbols',
                      },
                    })}
                    type="text"
                    placeholder="name"
                  />
                  {errors.name && <p>{errors.name.message}</p>}
                </div>
                <div className={styles.inputContainer}>
                  <input
                    {...register('login', {
                      required: 'Required field',
                      minLength: {
                        value: 3,
                        message: 'Login should contain minimum 3 symbols',
                      },
                      maxLength: {
                        value: 15,
                        message: 'Login should contain maximum 15 symbols',
                      },
                    })}
                    type="text"
                    placeholder="login"
                  />
                  {errors.login && <p>{errors.login.message}</p>}
                </div>
                <div className={styles.inputContainer}>
                  <input
                    {...register('password', {
                      required: 'Required field',
                      minLength: {
                        value: 5,
                        message: 'Password should contain minimum 5 symbols',
                      },
                      maxLength: {
                        value: 20,
                        message: 'Password should contain maximum 20 symbols',
                      },
                    })}
                    type="password"
                    placeholder="password"
                  />
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
                {loginStatus === 'failed' && (
                  <p className={styles.errorApi}>Account already exists</p>
                )}
                <button type="submit" className={styles.signUpBtn}>
                  Sign up
                </button>
                <Link className={styles.accountExist} to="singin">
                  I have an account
                </Link>
              </form>
              <div className={styles.imageBackground}>
                <img src={signImage} alt="sign-up" />
                <div className={styles.imageTitleContainer}>
                  <p className={styles.imageTitle}>Hello,</p>
                  <p className={styles.imageTitle}>Welcome back!</p>
                </div>
                <p className={styles.imageSubTitle}>Register your account on our platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUpPage;
