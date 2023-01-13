import { JsonPlaceholderService } from './JsonPlaceholderService';
import { RequestParams } from '../types/requestParams';
import { it, describe } from 'vitest';

const baseParams: RequestParams = {
  _page: 1,
  _limit: 10,
};

describe('JsonPlaceholderService', () => {
  it('should get users', async () => {
    const users = await JsonPlaceholderService.getUsers(baseParams);
    expect(users).toBeDefined();
  });
  
  it('should get users and the length should be 10', async () => {
    const users = await JsonPlaceholderService.getUsers(baseParams);
    expect(users.list).toHaveLength(10);
  });
  
  it('should get users and the total count should be 10', async () => {
    const users = await JsonPlaceholderService.getUsers(baseParams);
    expect(users.totalCount).toBe(10);
  });
  
  it('should get todos', async () => {
    const todos = await JsonPlaceholderService.getTodos(baseParams);
    expect(todos).toBeDefined();
  });
  
  it('should get comments', async () => {
    const comments = await JsonPlaceholderService.getComments(baseParams);
    expect(comments).toBeDefined();
  });
  
  it('should get posts', async () => {
    const posts = await JsonPlaceholderService.getPosts(baseParams);
    expect(posts).toBeDefined();
  });
  
});
