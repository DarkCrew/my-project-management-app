// import { AxiosResponse } from 'axios';
// import ManagerAppApi from 'core/rest/RestService';

// import { File } from './models';

// class FilesApi {
// static async getFile(fileId: string): Promise<AxiosResponse<File>> {
//   const res = await ManagerAppApi.get<File>(`/files/${fileId}`);
//   console.log('resp getFile', res);
//   return res;
// }

// static async getFilesByBoardId(boardId: string): Promise<AxiosResponse<File[]>> {
//   const res = await ManagerAppApi.get<File[]>(`/filesSet/${boardId}`);
//   console.log('resp getFilesByBoardId', res);
//   return res;
// }

// static async uploadFile(): Promise<AxiosResponse<File>> {
//   const res = await ManagerAppApi.post<File>(`/files`);
//   console.log('resp createFile', res);
//   return res;
// }

// static async deleteFile(fileId: string): Promise<AxiosResponse<File>> {
//   const res = await ManagerAppApi.delete<File>(`/files/${fileId}`);
//   console.log('resp deleteFile', res);
//   return res;
// }
// }

// export default FilesApi;
