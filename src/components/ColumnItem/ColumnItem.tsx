/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-underscore-dangle */
import React, { ReactElement, useEffect, useState } from 'react';
import { Column, Task, TaskCreateBody } from 'core/api/models';
import TasksApi from 'core/api/TasksApi';

import ModalWindow from 'components/ModalWindow/ModalWindow';

import binImage from '../../assets/images/bin.png';

import styles from './ColumnItem.module.scss';

type Props = {
  column: Column;
  deleteColumn: (boardId: string, columnId: string) => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const ColumnItem = ({ column, deleteColumn, setLoading }: Props): ReactElement => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [deleteId, setDeleteId] = useState('');
  const [modalWindow, setModalWindow] = useState(false);
  const [modalDeleteColumnWindow, setModalDeleteColumnWindow] = useState(false);
  const [modalDeleteTaskWindow, setModalDeleteTaskWindow] = useState(false);

  const toggleModalWindow = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    event.preventDefault();
    setModalWindow(!modalWindow);
  };
  const toggleDeleteColumnModalWindow = (
    event: React.MouseEvent<HTMLElement, MouseEvent>
  ): void => {
    event.preventDefault();
    setModalDeleteColumnWindow(!modalDeleteColumnWindow);
  };
  const toggleDeleteTaskModalWindow = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    event.preventDefault();
    setModalDeleteTaskWindow(!modalDeleteTaskWindow);
  };

  const getAllTasks = async (): Promise<void> => {
    const getColumns = await TasksApi.getTasksInColumn(column.boardId, column._id);
    setTasks(getColumns.data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getAllTasks();
  }, []);

  const createTask = async (task: TaskCreateBody): Promise<void> => {
    setLoading(true);
    const getApiTask = await TasksApi.createTask(column.boardId, column._id, task);
    if (getApiTask.status === 200) {
      getAllTasks();
    }
    setLoading(false);
  };

  const deleteCurrentTask = async (): Promise<void> => {
    setLoading(true);
    const deleteTaskApi = await TasksApi.deleteTask(column.boardId, column._id, deleteId);
    if (deleteTaskApi.status === 200) {
      getAllTasks();
    }
    setLoading(false);
  };

  const deleteCurrentColumn = (): void => {
    deleteColumn(column.boardId, column._id);
  };

  return (
    <>
      {modalDeleteColumnWindow && (
        <ModalWindow
          type="deletecolumn"
          toggleModalWindow={toggleDeleteColumnModalWindow}
          deleteCurrentColumn={deleteCurrentColumn}
        />
      )}
      {modalDeleteTaskWindow && (
        <ModalWindow
          type="deletetask"
          toggleModalWindow={toggleDeleteTaskModalWindow}
          deleteCurrentTask={deleteCurrentTask}
        />
      )}
      <div className={styles.board}>
        <div className={styles.boardTitle}>
          <p>{column.title}</p>
          <button type="button" onClick={toggleDeleteColumnModalWindow}>
            <img src={binImage} alt="bin" />
          </button>
        </div>
        <div className={styles.filterContainer}>
          <ul className={styles.boardContainer}>
            {tasks.map((elem) => (
              <li>
                <p>{elem.title}</p>
                <button
                  type="button"
                  className={styles.deleteBtn}
                  onClick={(event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
                    setDeleteId(elem._id);
                    toggleDeleteTaskModalWindow(event);
                  }}
                >
                  &#10006;
                </button>
              </li>
            ))}
          </ul>
        </div>

        <button type="button" className={styles.addItem} onClick={toggleModalWindow}>
          {modalWindow && (
            <ModalWindow
              type="createtask"
              toggleModalWindow={toggleModalWindow}
              createTask={createTask}
            />
          )}
          + Add task
        </button>
      </div>
    </>
  );
};

export default ColumnItem;
