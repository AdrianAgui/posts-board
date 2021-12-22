import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BackdropService } from '../../services/backdrop/backdrop.service';
import { LoaderService } from '../../services/loader/loader.service';
import { PostsService } from '../../services/posts/posts.service';
import { DetailComponent } from './detail.component';
import { UsersService } from './../../services/users/users.service';

describe('DetailComponent', () => {
  it('should be created', () => {
    const comp = new DetailComponent(
      {} as Router,
      {} as ActivatedRoute,
      {} as PostsService,
      {} as UsersService,
      {} as BackdropService,
      {} as LoaderService
    );
    expect(comp).toBeDefined();
  });
});
