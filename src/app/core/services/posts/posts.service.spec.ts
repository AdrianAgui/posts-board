import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Commentary } from '../../interfaces/comentary.interface';
import { Post } from '../../interfaces/post.interface';
import { ApiService } from '../api-service/api.service';
import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;
  let apiServiceSpy: jasmine.SpyObj<ApiService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', [
      'get',
      'post',
      'put',
      'delete',
    ]);

    TestBed.configureTestingModule({
      providers: [PostsService, { provide: ApiService, useValue: spy }],
    });

    postsService = TestBed.inject(PostsService);
    apiServiceSpy = TestBed.inject(ApiService) as jasmine.SpyObj<ApiService>;

    postsService.list = [
      { id: 1, userId: 1, title: 'post1', body: 'text1' },
      { id: 2, userId: 1, title: 'post2', body: 'text2' },
      { id: 3, userId: 2, title: 'post3', body: 'text3' },
    ];
  });

  it('should be created', () => {
    expect(postsService).toBeTruthy();
  });

  describe('Get posts data', () => {
    it('should return expected posts api empty', (done: DoneFn) => {
      postsService.list = [];
      const expectedPosts: Post[] = postsService.list;
      apiServiceSpy.get.and.returnValue(of(expectedPosts));
      postsService.get().subscribe((posts) => {
        expect(JSON.stringify(posts)).toEqual(JSON.stringify(expectedPosts));
        done();
      });
      expect(apiServiceSpy.get).toHaveBeenCalled();
    });

    it('should return expected posts cached', (done: DoneFn) => {
      const expectedPosts: Post[] = postsService.list;
      postsService.get().subscribe((posts) => {
        expect(JSON.stringify(posts)).toEqual(JSON.stringify(expectedPosts));
        done();
      });
    });
  });

  describe('Get post by ID', () => {
    it('should return expected post', () => {
      const expectedPost: Post = {
        id: 1,
        userId: 1,
        title: 'post1',
        body: 'text1',
      };
      expect(postsService.getById(1)).toEqual(expectedPost);
    });
  });

  describe('Create new post', () => {
    it('should call post', () => {
      postsService.create(postsService.list[0]);
      expect(apiServiceSpy.post).toHaveBeenCalled();
    });
  });

  describe('Update post', () => {
    it('should call put', () => {
      postsService.update(postsService.list[0]);
      expect(apiServiceSpy.put).toHaveBeenCalled();
    });
  });

  describe('Get comments from post', () => {
    it('should return expected comments', (done: DoneFn) => {
      const postId = 1;
      const expectedComments: Commentary[] = [
        {
          id: 1,
          postId: 1,
          name: 'name',
          body: 'body',
          email: 'email@email.com',
        } as Commentary,
      ];
      apiServiceSpy.get.and.returnValue(of(expectedComments));

      postsService.getComments(postId).subscribe((comments) => {
        expect(JSON.stringify(comments)).toEqual(
          JSON.stringify(expectedComments)
        );
        done();
      });
    });
  });
});
