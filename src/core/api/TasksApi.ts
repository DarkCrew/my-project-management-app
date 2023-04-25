import { AxiosResponse } from 'axios';

import ManagerAppApi from '../rest/RestService';

import { Task, TaskCreateBody, TaskUpdateBody, TaskUpdateSetBody } from './models';

class TasksApi {
  static async getTasksInColumn(boardId: string, columnId: string): Promise<AxiosResponse<Task[]>> {
    const res = await ManagerAppApi.get<Task[]>(`/boards/${boardId}/columns/${columnId}/tasks`);
    console.log('resp getTasksInColumn', res);
    return res;
  }

  static async getTaskById(
    boardId: string,
    columnId: string,
    taskId: string
  ): Promise<AxiosResponse<Task>> {
    const res = await ManagerAppApi.get<Task>(
      `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`
    );
    console.log('resp getTaskById', res);
    return res;
  }

  static async getTasksByIdsList(idsList: string[]): Promise<AxiosResponse<Task[]>> {
    const res = await ManagerAppApi.get<Task[]>(`/tasksSet?ids=${idsList.join(',')}`);
    console.log('resp getTasksByIdsList', res);
    return res;
  }

  static async getTasksByBoardId(boardId: string): Promise<AxiosResponse<Task[]>> {
    const res = await ManagerAppApi.get<Task[]>(`/tasksSet/${boardId}`);
    console.log('resp getTasksByBoardId', res);
    return res;
  }

  static async getTasksByUserId(userId: string): Promise<AxiosResponse<Task[]>> {
    const res = await ManagerAppApi.get<Task[]>(`/tasksSet?userId=${userId}`);
    console.log('resp getTasksByUserId', res);
    return res;
  }

  // static async getTasksBySearchRequest(searchRequest: string): Promise<AxiosResponse<Task[]>> {
  //   // TODO why it doesn't work
  //   const res = await ManagerAppApi.get<Task[]>(`/tasksSet?search=${searchRequest}`);
  //   console.log('resp getTasksBySearchRequest', res);
  //   return res;
  // }

  // static async getTasksByIdsListOrByUserIdOrBySearchRequest(
  //   // TODO why it doesn't work
  //   idsList?: string[],
  //   userId?: string,
  //   searchRequest?: string
  // ): Promise<AxiosResponse<Task[]>> {
  //   const res = await ManagerAppApi.get<Task[]>(
  //     `/tasksSet?ids=${idsList?.join(',')}&userId=${userId}&search=${searchRequest}`
  //     // `/tasksSet?ids=${idsList?.join(',')}&userId=${userId}`
  //   );
  //   console.log('resp getTasksss', res);
  //   return res;
  // }

  static async createTask(
    boardId: string,
    columnId: string,
    newTask: TaskCreateBody
  ): Promise<AxiosResponse<Task>> {
    const res = await ManagerAppApi.post<Task>(
      `/boards/${boardId}/columns/${columnId}/tasks`,
      newTask
    );
    console.log('resp createTask', res);
    return res;
  }

  static async updateTask(
    boardId: string,
    columnId: string,
    taskId: string,
    newTask: TaskUpdateBody
  ): Promise<AxiosResponse<Task>> {
    const res = await ManagerAppApi.put<Task>(
      `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      newTask
    );
    console.log('resp updateTask', res);
    return res;
  }

  static async updateSetOfTasks(newTasks: TaskUpdateSetBody[]): Promise<AxiosResponse<Task[]>> {
    const res = await ManagerAppApi.patch<Task[]>(`/tasksSet`, newTasks);
    console.log('resp updateSetOfTasks', res);
    return res;
  }

  static async deleteTask(
    boardId: string,
    columnId: string,
    taskId: string
  ): Promise<AxiosResponse<Task>> {
    const res = await ManagerAppApi.delete<Task>(
      `/boards/${boardId}/columns/${columnId}/tasks/${taskId}`
    );
    console.log('resp getTaskById', res);
    return res;
  }
}

export default TasksApi;
