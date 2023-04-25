import { AxiosResponse } from 'axios';

import ManagerAppApi from '../rest/RestService';

import { Board, BoardBody } from './models';

class BoardsApi {
  static async getBoard(boardId: string): Promise<AxiosResponse<Board>> {
    // TODO handle 404
    const res = await ManagerAppApi.get<Board>(`/boards/${boardId}`);
    console.log('resp getBoard', res);
    return res;
  }

  static async getAllBoards(): Promise<AxiosResponse<Board[]>> {
    const res = await ManagerAppApi.get<Board[]>(`/boards`);
    console.log('resp getBoards', res);
    return res;
  }

  static async getBoardsSetByIdsList(boardSet: string[]): Promise<AxiosResponse<Board[]>> {
    const res = await ManagerAppApi.get<Board[]>(`/boardsSet?ids=${boardSet.join(',')}`);
    console.log('resp getBoardsSet', res);
    return res;
  }

  static async getBoardsSetByUserId(userId: string): Promise<AxiosResponse<Board[]>> {
    const res = await ManagerAppApi.get<Board[]>(`/boardsSet/${userId}`);
    console.log('resp getAllUserBoards', res);
    return res;
  }

  static async createBoard(newBoard: BoardBody): Promise<AxiosResponse<Board>> {
    // TODO handle 400 bad request
    const res = await ManagerAppApi.post<Board>(`/boards`, newBoard);
    console.log('resp createBoard', res);
    return res;
  }

  static async updateBoard(boardId: string, newBoard: BoardBody): Promise<AxiosResponse<Board>> {
    // TODO handle 400 bad request
    const res = await ManagerAppApi.put<Board>(`/boards/${boardId}`, newBoard);
    console.log('resp updateBoard', res);
    return res;
  }

  static async deleteBoard(boardId: string): Promise<AxiosResponse<Board>> {
    const res = await ManagerAppApi.delete<Board>(`/boards/${boardId}`);
    console.log('resp deleteBoard', res);
    return res;
  }
}

export default BoardsApi;
