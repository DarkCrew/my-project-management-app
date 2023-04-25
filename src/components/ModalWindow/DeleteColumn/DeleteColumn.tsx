import React, { ReactElement } from 'react';

import answerImage from '../../../assets/images/answer.png';
import { Props } from '../types/DeleteColumn.types';

import styles from './DeleteColumn.module.scss';

const DeleteColumn = ({ deleteCurrentColumn, toggleModalWindow }: Props): ReactElement => {
  const deleteItem = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void | undefined => {
    if (deleteCurrentColumn !== undefined) {
      deleteCurrentColumn();
    }
    if (toggleModalWindow !== undefined) {
      toggleModalWindow(e);
    }
  };

  return (
    <>
      <img className={styles.answerImage} src={answerImage} alt="answer" />
      <p className={styles.title}>
        Are you sure to delete
        <br />
        this column with all tasks?
      </p>
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

export default DeleteColumn;
