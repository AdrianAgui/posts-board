import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UsersService } from './../../services/users/users.service';
import { PostsService } from './../../services/posts/posts.service';
import { HomeComponent } from './home.component';
import { ComponentsModule } from '../../components/components.module';

describe('HomeComponent', () => {
  let comp: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  let routerSpy = jasmine.createSpyObj({ navigate: () => {} });
  let postsServiceSpy = jasmine.createSpyObj({ get: () => [] });
  let usersServiceSpy = jasmine.createSpyObj({ get: () => [] });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ComponentsModule],
      declarations: [HomeComponent],
      providers: [
        HomeComponent,
        { provide: PostsService, useValue: postsServiceSpy },
        { provide: UsersService, useValue: usersServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    fixture = TestBed.createComponent(HomeComponent);
    comp = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(comp).toBeDefined();
  });
});
