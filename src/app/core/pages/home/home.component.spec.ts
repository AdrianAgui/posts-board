import { Router } from '@angular/router';
import { PostsService } from '../../services/posts/posts.service';
import { UsersService } from '../../services/users/users.service';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  it('should be created', () => {
    const comp = new HomeComponent(
      {} as PostsService,
      {} as UsersService,
      {} as Router
    );
    expect(comp).toBeDefined();
  });
});
