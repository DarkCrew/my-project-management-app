import { AxiosResponse } from 'axios';

import ManagerAppApi from '../rest/RestService';

import { User, UserRegistrationData } from './models';

class UsersApi {
  static async getUsers(): Promise<AxiosResponse<User[]>> {
    const res = await ManagerAppApi.get<User[]>(`/users`);
    console.log('resp getUsers', res);
    return res;
  }

  static async getUser(userId: string): Promise<AxiosResponse<User>> {
    const res = await ManagerAppApi.get<User>(`/users/${userId}`);
    console.log('resp getUser', res);
    return res;
  }

  static async updateUser(
    // TODO handle 404 & 409 login already exists
    userId: string,
    newUser: UserRegistrationData
  ): Promise<AxiosResponse<User>> {
    const res = await ManagerAppApi.put<User>(`/users/${userId}`, newUser);
    console.log('resp', res);
    return res;
  }

  static async deleteUser(userId: string): Promise<AxiosResponse<User>> {
    const res = await ManagerAppApi.delete<User>(`/users/${userId}`);
    console.log('resp deleteUser', res);
    return res;
  }
}

export default UsersApi;
