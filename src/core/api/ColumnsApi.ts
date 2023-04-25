import { AxiosResponse } from 'axios';

import ManagerAppApi from '../rest/RestService';

import { Column, ColumnBody, ColumnPatchBody, ColumnPostBody } from './models';

class ColumnsApi {
  static async getColumn(boardId: string, columnId: string): Promise<AxiosResponse<Column>> {
    // TODO handle 403 & 404
    const res = await ManagerAppApi.get<Column>(`/boards/${boardId}/columns/${columnId}`);
    console.log('resp getColumn', res);
    return res;
  }

  static async getAllColumnsByBoardId(boardId: string): Promise<AxiosResponse<Column[]>> {
    const res = await ManagerAppApi.get<Column[]>(`/boards/${boardId}/columns`);
    console.log('resp getAllColumnsByBoardId', res);
    return res;
  }

  static async getColumnsByIdsListAndUserId(
    columnIds: string[],
    userId: string
  ): Promise<AxiosResponse<Column[]>> {
    const res = await ManagerAppApi.get<Column[]>(
      `/columnsSet?ids=${columnIds.join(',')}&userId=${userId}`
    );
    console.log('resp getColumnsByIdsListAndUserId', res);
    return res;
  }

  static async getColumnsByIdsList(columnIds: string[]): Promise<AxiosResponse<Column[]>> {
    const res = await ManagerAppApi.get<Column[]>(`/columnsSet?ids=${columnIds.join(',')}`);
    console.log('resp getColumnsByIdsList', res);
    return res;
  }

  static async getColumnsByUserId(userId: string): Promise<AxiosResponse<Column[]>> {
    const res = await ManagerAppApi.get<Column[]>(`/columnsSet?userId=${userId}`);
    console.log('resp getColumnsByUserId', res);
    return res;
  }

  static async createColumn(
    boardId: string,
    newColumn: ColumnBody
  ): Promise<AxiosResponse<Column>> {
    // TODO handle 400 bad request
    const res = await ManagerAppApi.post<Column>(`/boards/${boardId}/columns`, newColumn);
    console.log('resp createColumn', res);
    return res;
  }

  static async createSetOfColumns(newColumns: ColumnPostBody[]): Promise<AxiosResponse<Column[]>> {
    const res = await ManagerAppApi.post<Column[]>(`/columnsSet`, newColumns);
    console.log('resp createSetOfColumns', res);
    return res;
  }

  static async updateColumn(
    boardId: string,
    columnId: string,
    newColumn: ColumnBody
  ): Promise<AxiosResponse<Column>> {
    // TODO handle 400 bad request
    const res = await ManagerAppApi.put<Column>(
      `/boards/${boardId}/columns/${columnId}`,
      newColumn
    );
    console.log('resp updateColumn', res);
    return res;
  }

  static async updateSetOfColumns(newColumns: ColumnPatchBody[]): Promise<AxiosResponse<Column[]>> {
    const res = await ManagerAppApi.patch<Column[]>(`/columnsSet`, newColumns);
    console.log('resp updateSetOfColumns', res);
    return res;
  }

  static async deleteColumn(boardId: string, columnId: string): Promise<AxiosResponse<Column>> {
    const res = await ManagerAppApi.delete<Column>(`/boards/${boardId}/columns/${columnId}`);
    console.log('resp deleteColumn', res);
    return res;
  }
}

export default ColumnsApi;
