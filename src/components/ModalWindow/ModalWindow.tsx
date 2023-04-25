/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { ReactElement } from 'react';

import AddColumn from './AddColumn/AddColumn';
import AddTask from './AddTask/AddTask';
import CreateBoard from './CreateBoard/CreateBoard';
import CreateProfile from './CreateProfile/CreateProfile';
import DeleteBoard from './DeleteBoard/DeleteBoard';
import DeleteColumn from './DeleteColumn/DeleteColumn';
import DeleteProfile from './DeleteProfile/DeleteProfile';
import DeleteTask from './DeleteTask/DeleteTask';
import EditProfile from './EditProfile/EditProfile';
import { Props, TYPES } from './types/ModalWindow.types';

import styles from './ModalWindow.module.scss';

const ModalWindow = ({
  toggleModalWindow,
  setModalSaveWindow,
  deleteBoard,
  deleteProfile,
  createColumn,
  deleteCurrentColumn,
  deleteCurrentTask,
  createTask,
  type,
}: Props): ReactElement => {
  const disableClick = (event: { stopPropagation: () => void }): void => {
    event.stopPropagation();
  };

  return (
    <button
      type="button"
      className={type === TYPES.PROFILE ? styles.modalProfileWindow : styles.modalWindow}
      onClick={toggleModalWindow}
    >
      <div className={type === TYPES.PROFILE ? styles.filterUnActive : styles.filter} />
      <div
        className={type === TYPES.PROFILE ? styles.containerProfile : styles.container}
        onClick={disableClick}
      >
        <button
          type="button"
          className={type === TYPES.PROFILE ? styles.closeBtnUnActive : styles.closeBtn}
          onClick={toggleModalWindow}
        >
          &times;
        </button>
        {type === TYPES.DELETE && (
          <DeleteBoard deleteBoard={deleteBoard} toggleModalWindow={toggleModalWindow} />
        )}
        {type === TYPES.CREATE && <CreateBoard toggleModalWindow={toggleModalWindow} />}
        {type === TYPES.PROFILE && <EditProfile setModalSaveWindow={setModalSaveWindow} />}
        {type === TYPES.DELETEPROFILE && (
          <DeleteProfile deleteProfile={deleteProfile} toggleModalWindow={toggleModalWindow} />
        )}
        {type === TYPES.SAVEPROFILE && <CreateProfile toggleModalWindow={toggleModalWindow} />}
        {type === TYPES.CREATECOLUMN && (
          <AddColumn createColumn={createColumn} toggleModalWindow={toggleModalWindow} />
        )}
        {type === TYPES.DELETECOLUMN && (
          <DeleteColumn
            deleteCurrentColumn={deleteCurrentColumn}
            toggleModalWindow={toggleModalWindow}
          />
        )}
        {type === TYPES.CREATETASK && (
          <AddTask createTask={createTask} toggleModalWindow={toggleModalWindow} />
        )}
        {type === TYPES.DELETETASK && (
          <DeleteTask deleteCurrentTask={deleteCurrentTask} toggleModalWindow={toggleModalWindow} />
        )}
      </div>
    </button>
  );
};

export default ModalWindow;
