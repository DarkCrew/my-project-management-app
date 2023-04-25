import React, { ReactElement } from 'react';

import answerImage from '../../../assets/images/answer.png';
import { Props } from '../types/DeleteTask.types';

import styles from './DeleteTask.module.scss';

const DeleteTask = ({ deleteCurrentTask, toggleModalWindow }: Props): ReactElement => {
  const deleteItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void | undefined => {
    if (deleteCurrentTask !== undefined) {
      deleteCurrentTask();
    }
    if (toggleModalWindow !== undefined) {
      toggleModalWindow(e);
    }
  };

  return (
    <>
      <img className={styles.answerImage} src={answerImage} alt="answer" />
      <p className={styles.title}>Are you sure to delete this task?</p>
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

export default DeleteTask;
