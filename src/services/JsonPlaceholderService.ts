import { IUser, IUserBase } from '../interfaces/user';
import { ITodo } from '../interfaces/todo';
import { IComment } from '../interfaces/comment';
import { IPost } from '../interfaces/post';
import axios, { AxiosResponse } from 'axios';
import { IListResponse } from '../interfaces/listResponse';
import { RequestParams } from '../types/requestParams';

export namespace JsonPlaceholderService {
  const baseURL = 'https://jsonplaceholder.typicode.com';

  const parseResponse = <T>(res: AxiosResponse<T[]>): IListResponse<T> =>
    ({ list: res.data, totalCount: +(res.headers?.['x-total-count'] || res.data.length) });

  export function getUsers(params: RequestParams<IUserBase>): Promise<IListResponse<IUser>> {
    return axios.get<IUser[]>(`${baseURL}/users`, { params }).then(parseResponse);
  }
  
  export function getUserDetails(id: number): Promise<IUser> {
    return axios.get<IUser>(`${baseURL}/users/${id}`).then(res => res.data);
  }

  export function getTodos(params: RequestParams<ITodo>): Promise<IListResponse<ITodo>> {
    return axios.get<ITodo[]>(`${baseURL}/todos`, { params }).then(parseResponse);
  }
  
  export function getTodoDetails(id: number): Promise<ITodo> {
    return axios.get<ITodo>(`${baseURL}/todos/${id}`).then(res => res.data);
  }

  export function getComments(params: RequestParams<IComment>): Promise<IListResponse<IComment>> {
    return axios.get<IComment[]>(`${baseURL}/comments`, { params }).then(parseResponse);
  }
  
  export function getCommentDetails(id: number): Promise<IComment> {
    return axios.get<IComment>(`${baseURL}/comments/${id}`).then(res => res.data);
  }

  export function getPosts(params: RequestParams<IPost>): Promise<IListResponse<IPost>> {
    return axios.get<IPost[]>(`${baseURL}/posts`, { params }).then(parseResponse);
  }
  
  export function getPostDetails(id: number): Promise<IPost> {
    return axios.get<IPost>(`${baseURL}/posts/${id}`).then(res => res.data);
  }
}