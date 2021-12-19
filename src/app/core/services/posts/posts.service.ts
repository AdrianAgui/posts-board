import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { map, Observable, of, Subject, tap } from 'rxjs';
import { Post } from '../../interfaces/post.interface';

const getPostsEndpoint = 'https://jsonplaceholder.typicode.com/posts';
const getCommentsEndpoint = 'https://jsonplaceholder.typicode.com/comments';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private list: Post[] = [];

  postsRefreshed: Subject<boolean> = new Subject<boolean>();

  constructor(private apiService: ApiService) {}

  get() {
    return this.list.length > 0
      ? this.getFromCache()
      : this.getFromApi().pipe(map((posts) => (this.list = posts)));
  }

  create(post: Post) {
    return this.apiService.post<Post>(
      getPostsEndpoint,
      post
    ) as Observable<Post>;
  }

  getComments() {
    return this.apiService.get<any[]>(getCommentsEndpoint) as Observable<any[]>;
  }

  getById(id: number): Post {
    return this.list.find((post) => id === post.id)!;
  }

  private getFromCache() {
    return of(this.list);
  }

  private getFromApi() {
    return this.apiService.get<Post[]>(getPostsEndpoint) as Observable<Post[]>;
  }
}
