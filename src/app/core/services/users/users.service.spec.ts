import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { ApiService } from '../api-service/api.service';

describe('UsersService', () => {
  let usersService: UsersService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', [
      'get',
      'getById',
      'getName',
    ]);

    TestBed.configureTestingModule({
      providers: [UsersService, { provide: ApiService, useValue: spy }],
    });

    usersService = TestBed.inject(UsersService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(usersService).toBeTruthy();
    expect(usersService.list.length).toEqual(0);
  });
});
