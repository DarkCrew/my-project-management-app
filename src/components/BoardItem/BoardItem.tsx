/* eslint-disable react/jsx-no-bind */
/* eslint-disable no-underscore-dangle */
import React, { ReactElement, useState } from 'react';
import { NavLink } from 'react-router-dom';
import BoardsApi from 'core/api/BoardsApi';
import { Board } from 'core/api/models';

import ModalWindow from 'components/ModalWindow/ModalWindow';

import binImage from '../../assets/images/bin.png';
import boardImage from '../../assets/images/board.png';

import styles from './BoardItem.module.scss';

export type Props = {
  boardInfo: Board;
  deleteCurrentBoard: (id: string) => void;
};

const BoardItem = ({ boardInfo, deleteCurrentBoard }: Props): ReactElement => {
  const [modalWindow, setModalWindow] = useState(false);
  const boardNumber = boardInfo._id.slice(boardInfo._id.length - 4);

  const toggleModalWindow = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
    event.preventDefault();
    setModalWindow(!modalWindow);
  };

  const deleteBoard = (): void => {
    deleteCurrentBoard(boardInfo._id);
  };

  return (
    <>
      <NavLink to={`/board/${boardInfo._id}`}>
        <div className={styles.board}>
          <div className={styles.info}>
            <div className={styles.boardNumber}>
              <img className={styles.boardImage} src={boardImage} alt="board" />
              <p className={styles.number}>#{boardNumber}</p>
            </div>
            <p>{boardInfo.title}</p>
          </div>
          <div className={styles.delete}>
            <p>owner: {boardInfo.owner}</p>
            <button type="button" className={styles.bin} onClick={toggleModalWindow}>
              <img className={styles.binImage} src={binImage} alt="bin" />
            </button>
          </div>
        </div>
      </NavLink>
      {modalWindow && (
        <ModalWindow
          type="delete"
          toggleModalWindow={toggleModalWindow}
          deleteBoard={deleteBoard}
        />
      )}
    </>
  );
};

export default BoardItem;
