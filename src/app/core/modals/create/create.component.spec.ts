import { CreateComponent } from './create.component';
import { PostsService } from './../../services/posts/posts.service';
import { BackdropService } from './../../services/backdrop/backdrop.service';
import { FormBuilder } from '@angular/forms';
import { LoaderService } from './../../services/loader/loader.service';
import { Router } from '@angular/router';

describe('CreateComponent', () => {
  it('should be created', () => {
    const comp = new CreateComponent(
      {} as Router,
      {} as PostsService,
      {} as BackdropService,
      {} as FormBuilder,
      {} as LoaderService
    );
    expect(comp).toBeDefined();
  });
});
