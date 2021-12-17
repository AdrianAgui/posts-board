import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { forkJoin, map, Observable } from 'rxjs';
import { PostsService } from './../services/posts/posts.service';
import { UsersService } from './../services/users/users.service';

@Injectable({
  providedIn: 'root',
})
export class InitGuard implements CanActivate {
  constructor(
    private postsService: PostsService,
    private usersService: UsersService
  ) {}

  canActivate(): Observable<boolean> {
    return forkJoin([this.postsService.get(), this.usersService.get()]).pipe(
      map((data) => {
        return data[0].length > 0 && data[1].length > 0;
      })
    );
  }
}
