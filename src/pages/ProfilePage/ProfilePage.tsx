/* eslint-disable array-callback-return */
/* eslint-disable no-underscore-dangle */
import React, { ReactElement, useState } from 'react';
import { User } from 'core/api/models';
import UsersApi from 'core/api/UsersApi';
import { useAppDispatch } from 'store';
import { changeAuthStatus } from 'store/authSlice';

import ModalWindow from 'components/ModalWindow/ModalWindow';

import binImage from '../../assets/images/bin.png';
import profileImage from '../../assets/images/profile.png';

import styles from './ProfilePage.module.scss';

const ProfilePage = (): ReactElement => {
  const [modalWindow, setModalWindow] = useState(false);
  const [modalSaveWindow, setModalSaveWindow] = useState(false);

  const toggleModalWindow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault();
    setModalWindow(!modalWindow);
  };

  const toggleSaveModalWindow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault();
    setModalSaveWindow(!modalSaveWindow);
  };

  const dispatch = useAppDispatch();
  const deleteUserFromAPi = async (): Promise<number> => {
    if (localStorage.getItem('user') !== null) {
      const userIdLocalStorage = String(localStorage.getItem('user'));
      const usersInfo: User[] = await (await UsersApi.getUsers()).data;
      let deleteIdUser = '';

      usersInfo.map((user: User) => {
        if (user.login === userIdLocalStorage) {
          deleteIdUser = user._id;
        }
      });

      const result = await UsersApi.deleteUser(deleteIdUser);
      return result.status;
    }
    return 0;
  };
  const deleteProfile = async (): Promise<void> => {
    if ((await deleteUserFromAPi()) === 200) {
      dispatch(changeAuthStatus(false));
      localStorage.removeItem('project-management-app-token');
      localStorage.removeItem('token-created-time');
      localStorage.removeItem('user');
    }
  };

  return (
    <section className={styles.profile}>
      {modalWindow && (
        <ModalWindow
          type="deleteprofile"
          toggleModalWindow={toggleModalWindow}
          deleteProfile={deleteProfile}
        />
      )}
      {modalSaveWindow && (
        <ModalWindow type="saveprofile" toggleModalWindow={toggleSaveModalWindow} />
      )}
      <div className="container">
        <div className={styles.container}>
          <div className={styles.mainContainer}>
            <div className={styles.profileForm}>
              <div className={styles.mainInfo}>
                <img src={profileImage} alt="profile" />
                <div className={styles.title}>
                  <div className={styles.divider} />
                  <p>Edit your profile</p>
                </div>
              </div>
              <ModalWindow type="profile" setModalSaveWindow={setModalSaveWindow} />
            </div>
            <div className={styles.deleteAccount}>
              <button type="button" onClick={toggleModalWindow}>
                <img src={binImage} alt="bin" />
                Delete my account
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
