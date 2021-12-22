import { TestBed } from '@angular/core/testing';

import { InitGuard } from './init.guard';
import { PostsService } from './../services/posts/posts.service';
import { UsersService } from './../services/users/users.service';

describe('InitGuard', () => {
  let initGuard: InitGuard;
  let postsServiceSpy: jasmine.SpyObj<PostsService>;
  let usersServiceSpy: jasmine.SpyObj<UsersService>;

  beforeEach(() => {
    postsServiceSpy = jasmine.createSpyObj('PostsService', ['get']);
    usersServiceSpy = jasmine.createSpyObj('UsersService', ['get']);

    TestBed.configureTestingModule({
      providers: [
        InitGuard,
        { provide: PostsService, useValue: postsServiceSpy },
        { provide: UsersService, useValue: usersServiceSpy },
      ],
    });

    initGuard = TestBed.inject(InitGuard);
    postsServiceSpy = TestBed.inject(
      PostsService
    ) as jasmine.SpyObj<PostsService>;
    usersServiceSpy = TestBed.inject(
      UsersService
    ) as jasmine.SpyObj<UsersService>;
  });

  it('should be created', () => {
    expect(initGuard).toBeTruthy();
  });
});
