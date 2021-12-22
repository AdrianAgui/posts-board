import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { map, Observable, of, Subject, tap } from 'rxjs';
import { Post } from '../../interfaces/post.interface';

const getEndpoint = 'https://jsonplaceholder.typicode.com/posts';
const putEndpoint = (postId: number) =>
  `https://jsonplaceholder.typicode.com/posts/${postId}`;
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
    return this.apiService.post<Post>(getEndpoint, post) as Observable<Post>;
  }

  update(post: Post) {
    console.log(post);
    return this.apiService.put<Post>(putEndpoint(post.id), {
      title: post.title,
      body: post.body,
    }) as Observable<Post>;
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
    return this.apiService.get<Post[]>(getEndpoint) as Observable<Post[]>;
  }
}
