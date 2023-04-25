import { AxiosResponse } from 'axios';

import { AuthToken, User, UserLoginData, UserRegistrationData } from '../api/models';

import ManagerAppApi from './RestService';

export const TOKEN_LIFETIME = 43200000;

class AuthApi {
  static async signUp(userData: UserRegistrationData): Promise<AxiosResponse<User>> {
    const res = await ManagerAppApi.post<User>(`/auth/signup`, userData); //  registration
    // console.log('resp signUp', res);
    if (+res.status === 200) {
      const { login, password } = userData;
      this.signIn({ login, password });
    }
    return res;
  }

  static async signIn(userData: UserLoginData): Promise<AxiosResponse<AuthToken>> {
    const res = await ManagerAppApi.post<AuthToken>(`/auth/signin`, userData);
    if (+res.status === 200 && res.data.token) {
      localStorage.setItem('project-management-app-token', res.data.token);
      const time = `${new Date().getTime()}`;
      localStorage.setItem('token-created-time', time);
    }
    return res;
  }
}

export default AuthApi;
