import { TestBed } from '@angular/core/testing';

import { UsersService } from './users.service';
import { ApiService } from '../api-service/api.service';
import { User } from './../../interfaces/user.interface';
import { of } from 'rxjs';

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

    usersService.list = [
      { id: 1, username: 'john', email: 'john@gmail.com' },
      { id: 2, username: 'britney', email: 'britney@gmail.com' },
    ];
  });

  it('should be created', () => {
    expect(usersService).toBeTruthy();
    expect(usersService.list.length).toEqual(2);
  });

  describe('Get users data', () => {
    it('should return expected users api empty', (done: DoneFn) => {
      usersService.list = [];
      const expectedUsers: User[] = usersService.list;
      apiServiceSpy.get.and.returnValue(of(expectedUsers));
      usersService.get().subscribe((users) => {
        expect(JSON.stringify(users)).toEqual(JSON.stringify(expectedUsers));
        done();
      });
      expect(apiServiceSpy.get).toHaveBeenCalled();
    });

    it('should return expected users cached', (done: DoneFn) => {
      const expectedUsers: User[] = usersService.list;
      usersService.get().subscribe((users) => {
        expect(JSON.stringify(users)).toEqual(JSON.stringify(expectedUsers));
        done();
      });
    });
  });

  describe('Get user by ID', () => {
    it('should return expected user', () => {
      const expectedUser: User = {
        id: 1,
        username: 'john',
        email: 'john@gmail.com',
      };
      expect(usersService.getById(1)).toEqual(expectedUser);
    });
  });

  describe('Get user name', () => {
    it('should return expected name', () => {
      const expectedName = 'john';
      expect(usersService.getName(1)).toEqual(expectedName);
    });
  });
});
