import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostsService } from './../../services/posts/posts.service';
import { HomeComponent } from './home.component';
import { ComponentsModule } from '../../components/components.module';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { MockPostsService } from '../../mocks/posts.service.mock';
import { MockUsersService } from '../../mocks/users.service.mock';

describe('HomeComponent', () => {
  let comp: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let routerSpy = jasmine.createSpyObj({ navigate: () => {} });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule],
      declarations: [HomeComponent],
      providers: [
        HomeComponent,
        { provide: PostsService, useClass: MockPostsService },
        { provide: UsersService, useClass: MockUsersService },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(HomeComponent);
    comp = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(comp).toBeDefined();
  });

  describe('Init component', () => {
    it('should get posts empty and users', () => {
      comp.ngOnInit();
      expect(comp.posts).toEqual([]);
      expect(comp.postsView).toEqual([]);
    });
  });

  describe('Open create modal', () => {
    it('should navigate', () => {
      comp.openCreateModal();
      expect(routerSpy.navigate).toHaveBeenCalled();
    });
  });
});
