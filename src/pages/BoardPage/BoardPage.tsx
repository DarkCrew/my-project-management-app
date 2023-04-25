/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { ReactElement, useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import ColumnsApi from 'core/api/ColumnsApi';
import { Column, ColumnBody } from 'core/api/models';

import ColumnItem from 'components/ColumnItem/ColumnItem';
import Loader from 'components/Loader/Loader';
import ModalWindow from 'components/ModalWindow/ModalWindow';

import styles from './BoardPage.module.scss';

const BoardPage = (): ReactElement => {
  const params = useParams();
  const [modalWindow, setModalWindow] = useState(false);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(false);

  const toggleModalWindow = (event: React.MouseEvent<HTMLElement, MouseEvent>): void => {
    event.preventDefault();
    setModalWindow(!modalWindow);
  };

  const getAllColumns = async (): Promise<void> => {
    const getColumns = await ColumnsApi.getAllColumnsByBoardId(String(params.id));
    setColumns(getColumns.data);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getAllColumns();
  }, []);

  const createColumn = async (column: ColumnBody): Promise<void> => {
    setLoading(true);
    const createColumnResp = await ColumnsApi.createColumn(String(params.id), column);
    if (createColumnResp.status === 200) {
      getAllColumns();
    }
  };

  const deleteColumn = async (boardId: string, columnId: string): Promise<void> => {
    setLoading(true);
    const createColumnResp = await ColumnsApi.deleteColumn(boardId, columnId);
    if (createColumnResp.status === 200) {
      getAllColumns();
    }
  };

  return (
    <>
      {loading && <Loader />}
      <section className={styles.boards}>
        <div className="container">
          <div className={styles.container}>
            <NavLink className={styles.backButton} to="/main">
              <button type="button">&#5130;</button>
            </NavLink>
            <div className={styles.mainContainer}>
              {columns.map((column: Column) => (
                <ColumnItem setLoading={setLoading} column={column} deleteColumn={deleteColumn} />
              ))}
              <div className={styles.addButton}>
                <div className={styles.buttonAddContainer}>
                  <button
                    className={styles.addColumnButton}
                    type="button"
                    onClick={toggleModalWindow}
                  >
                    {modalWindow && (
                      <ModalWindow
                        type="createcolumn"
                        toggleModalWindow={toggleModalWindow}
                        createColumn={createColumn}
                      />
                    )}
                    + Add column
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BoardPage;
