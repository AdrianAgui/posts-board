import { Router, ActivatedRoute, Params } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailComponent } from './detail.component';
import { of, Subject } from 'rxjs';
import { LoaderService } from './../../services/loader/loader.service';
import { BackdropService } from './../../services/backdrop/backdrop.service';
import { UsersService } from './../../services/users/users.service';
import { PostsService } from './../../services/posts/posts.service';

describe('DetailComponent', () => {
  let comp: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  let routerSpy = jasmine.createSpyObj({ navigate: () => {} });
  let activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
  let postsServiceSpy = jasmine.createSpyObj('PostsService', [
    'getById',
    'getComments',
  ]);
  let usersServiceSpy = jasmine.createSpyObj({ getName: () => 'john' });
  let backdropServiceSpy = jasmine.createSpyObj('BackdropService', [
    'enable',
    'disable',
  ]);
  let loaderSpy = jasmine.createSpyObj({ display: () => {}, hide: () => {} });

  activatedRouteSpy.params = new Subject();
  postsServiceSpy.getComments.and.returnValue = of({});
  postsServiceSpy.getById.and.returnValue = {
    id: 1,
    userId: 1,
    title: 'post1',
    body: 'text1',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailComponent],
      providers: [
        DetailComponent,
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: PostsService, useValue: postsServiceSpy },
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: BackdropService, useValue: backdropServiceSpy },
        { provide: LoaderService, useValue: loaderSpy },
      ],
    });

    fixture = TestBed.createComponent(DetailComponent);
    comp = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(comp).toBeDefined();
  });

  describe('Init component', () => {
    it('should receive post id', (done: DoneFn) => {
      const postId = 1;
      comp.ngOnInit();

      setTimeout(() => {
        activatedRouteSpy.params.next({ postId: postId } as Params);
        expect(comp.postId).toEqual(postId);
        done();
      }, 500);
    });
  });

  describe('Close modal', () => {
    it('should navigate to router outlet aux to null', () => {
      comp.close();

      expect(routerSpy.navigate).toHaveBeenCalled();
      expect(backdropServiceSpy.disable).toHaveBeenCalled();
    });
  });
});
