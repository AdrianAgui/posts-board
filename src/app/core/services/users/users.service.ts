import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { User } from '../../interfaces/user.interface';
import { ApiService } from './../api-service/api.service';

const getUsersEndpoint = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  list: User[] = [];

  constructor(private apiService: ApiService) {}

  get() {
    return this.list.length > 0
      ? of(this.list)
      : (
          this.apiService.get<User[]>(getUsersEndpoint) as Observable<User[]>
        ).pipe(map((users) => (this.list = users)));
  }

  getById(id: number): User {
    return this.list.find((post) => id === post.id)!;
  }

  getName(id: number): string {
    return this.list.find((post) => id === post.id)?.username!;
  }
}
