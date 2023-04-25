import React, { ReactElement, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BoardsApi from 'core/api/BoardsApi';
import { BoardBody } from 'core/api/models';

import { Props } from '../types/CreateBoard.types';

import styles from './CreateBoard.module.scss';

const CreateBoard = ({ toggleModalWindow }: Props): ReactElement => {
  const [title, setTitle] = useState('');
  const [owner, setOwner] = useState('');
  const navigate = useNavigate();

  const changeInputTitle = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setTitle(e.target.value);
  };
  const changeInputOwner = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setOwner(e.target.value);
  };

  const createBoard = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    const board: BoardBody = {
      title,
      owner,
      users: [],
    };
    BoardsApi.createBoard(board);
    if (toggleModalWindow !== undefined) {
      toggleModalWindow(e);
    }
    navigate('/');
  };

  return (
    <>
      <p className={styles.title}>Create new board</p>
      <div className={styles.inputContainer}>
        <p>Board title</p>
        <input value={title} onChange={changeInputTitle} />
      </div>
      <div className={styles.inputContainer}>
        <p>Board owner</p>
        <input value={owner} onChange={changeInputOwner} />
      </div>
      <button className={styles.createButton} type="button" onClick={createBoard}>
        Create
      </button>
    </>
  );
};

export default CreateBoard;
