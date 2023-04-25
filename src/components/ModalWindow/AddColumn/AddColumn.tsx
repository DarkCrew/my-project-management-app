import React, { ReactElement, useState } from 'react';
import { ColumnBody } from 'core/api/models';

import { Props } from '../types/AddColumn.types';

import styles from './AddColumn.module.scss';

const AddColumn = ({ toggleModalWindow, createColumn }: Props): ReactElement => {
  const [title, setTitle] = useState('');

  const changeInputTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };

  const addColumn = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const column: ColumnBody = {
      title,
      order: 0,
    };
    createColumn?.(column);
    toggleModalWindow?.(e);
  };

  return (
    <>
      <p className={styles.title}>Create new column</p>
      <div className={styles.inputContainer}>
        <p>Column title</p>
        <input value={title} onChange={changeInputTitle} />
      </div>
      <button className={styles.createButton} type="button" onClick={addColumn}>
        Add
      </button>
    </>
  );
};

export default AddColumn;
