import React, { ReactElement } from 'react';

import answerImage from '../../../assets/images/answer.png';
import { Props } from '../types/DeleteProfile.types';

import styles from './DeleteProfile.module.scss';

const DeleteProfile = ({ deleteProfile, toggleModalWindow }: Props): ReactElement => {
  const deleteItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void | undefined => {
    if (deleteProfile !== undefined) {
      deleteProfile();
    }
    if (toggleModalWindow !== undefined) {
      toggleModalWindow(e);
    }
  };

  return (
    <>
      <img className={styles.answerImage} src={answerImage} alt="answer" />
      <p className={styles.title}>Are you sure to delete your profile?</p>
      <div className={styles.buttonContainer}>
        <button type="button" className={styles.buttonYes} onClick={deleteItem}>
          Yes
        </button>
        <button type="button" className={styles.buttonNo} onClick={toggleModalWindow}>
          No
        </button>
      </div>
    </>
  );
};

export default DeleteProfile;
