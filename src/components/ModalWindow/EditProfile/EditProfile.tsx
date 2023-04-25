/* eslint-disable no-underscore-dangle */
/* eslint-disable array-callback-return */
/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { User } from 'core/api/models';
import UsersApi from 'core/api/UsersApi';

import { Props } from '../types/EditProfile.types';

import styles from './EditProfile.module.scss';

const EditProfile = ({ setModalSaveWindow }: Props): ReactElement => {
  const [name, setName] = useState('');
  const [login, setLogin] = useState('');
  const [loginId, setLoginId] = useState('');

  interface IFormInput {
    name: string;
    login: string;
    password: string;
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<IFormInput>();

  const getUser = async (): Promise<void> => {
    if (localStorage.getItem('user') !== null) {
      const userIdLocalStorage = String(localStorage.getItem('user'));
      const usersInfo: User[] = await (await UsersApi.getUsers()).data;

      usersInfo.map((user: User) => {
        if (user.login === userIdLocalStorage) {
          setLoginId(user._id);
          setName(user.name);
          setLogin(user.login);
        }
      });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = (data: IFormInput): void => {
    localStorage.setItem('user', data.login);
    setName(data.name);
    setLogin(data.login);
    UsersApi.updateUser(loginId, data);
    reset();
    if (setModalSaveWindow) {
      setModalSaveWindow(true);
    }
  };

  return (
    <form className={styles.formEdit} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.input}>
        <p>Name</p>
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
            placeholder={name}
          />
          {errors.name && <p>{errors.name.message}</p>}
        </div>
      </div>
      <div className={styles.input}>
        <p>Login</p>
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
            placeholder={login}
          />
          {errors.login && <p>{errors.login.message}</p>}
        </div>
      </div>
      <div className={styles.input}>
        <p>Password</p>
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
      </div>
      <button type="submit" className={styles.saveButton}>
        Save
      </button>
    </form>
  );
};

export default EditProfile;
