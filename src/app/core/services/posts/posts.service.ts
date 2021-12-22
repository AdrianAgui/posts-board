import { Injectable } from '@angular/core';
import { ApiService } from '../api-service/api.service';
import { map, Observable, of, Subject, tap } from 'rxjs';
import { Post } from '../../interfaces/post.interface';
import { Commentary } from '../../interfaces/comentary.interface';

const getEndpoint = 'https://jsonplaceholder.typicode.com/posts';
const putEndpoint = (postId: number) =>
  `https://jsonplaceholder.typicode.com/posts/${postId}`;
const getCommentsEndpoint = (postId: number) =>
  `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;

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

  getComments(postId: number) {
    return this.apiService.get<Commentary[]>(
      getCommentsEndpoint(postId)
    ) as Observable<Commentary[]>;
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
