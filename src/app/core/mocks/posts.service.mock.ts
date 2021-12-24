import { of } from 'rxjs';
import { Post } from '../interfaces/post.interface';

export class MockPostsService {
  get = () => of([]);
  getById = () => {
    return { id: 1, userId: 1, title: 'title', body: 'body' } as Post;
  };
  getComments = () => of([]);
  create = () => of({});
}
