import { Injectable } from '@angular/core';
import { Post } from '../../entities/post.entity';
import { ApiService } from '../api-service/api.service';
import { Observable } from 'rxjs';

const getPostsEndpoint = 'https://jsonplaceholder.typicode.com/posts';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private apiService: ApiService) {}

  get() {
    return this.apiService.get<Post[]>(getPostsEndpoint) as Observable<Post[]>;
  }
}
