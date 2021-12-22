import { TestBed } from '@angular/core/testing';
import { ApiService } from '../api-service/api.service';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', [
      'get',
      'getById',
      'getName',
    ]);

    TestBed.configureTestingModule({
      providers: [PostsService, { provide: ApiService, useValue: spy }],
    });

    postsService = TestBed.inject(PostsService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;
  });

  it('should be created', () => {
    expect(postsService).toBeTruthy();
  });
});
