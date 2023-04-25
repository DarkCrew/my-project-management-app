import React, { ReactElement } from 'react';

import answerImage from '../../../assets/images/answer.png';
import { Props } from '../types/CreateProfile.types';

import styles from './CreateProfile.module.scss';

const CreateProfile = ({ toggleModalWindow }: Props): ReactElement => {
  return (
    <>
      <img className={styles.answerImage} src={answerImage} alt="answer" />
      <p className={styles.title}>Profile created successfully</p>
      <div className={styles.buttonContainer}>
        <button type="button" className={styles.buttonYes} onClick={toggleModalWindow}>
          OK
        </button>
      </div>
    </>
  );
};

export default CreateProfile;
