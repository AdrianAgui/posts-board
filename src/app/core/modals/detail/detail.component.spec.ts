import { Router, ActivatedRoute, Params } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DetailComponent } from './detail.component';
import { Subject } from 'rxjs';
import { LoaderService } from './../../services/loader/loader.service';
import { BackdropService } from './../../services/backdrop/backdrop.service';
import { UsersService } from './../../services/users/users.service';
import { PostsService } from './../../services/posts/posts.service';
import { MockPostsService } from '../../mocks/posts.service.mock';
import { MockUsersService } from '../../mocks/users.service.mock';

describe('DetailComponent', () => {
  let comp: DetailComponent;
  let fixture: ComponentFixture<DetailComponent>;

  let routerSpy = jasmine.createSpyObj({ navigate: () => {} });
  let activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['']);
  let backdropServiceSpy = jasmine.createSpyObj('BackdropService', [
    'enable',
    'disable',
  ]);
  let loaderSpy = jasmine.createSpyObj({ display: () => {}, hide: () => {} });

  activatedRouteSpy.params = new Subject();

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailComponent],
      providers: [
        DetailComponent,
        { provide: Router, useValue: routerSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
        { provide: PostsService, useClass: MockPostsService },
        { provide: UsersService, useClass: MockUsersService },
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
    it('should receive post id', () => {
      const postId = 1;
      comp.ngOnInit();
      activatedRouteSpy.params.next({ postId: postId } as Params);

      expect(comp.postId).toEqual(postId);
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
