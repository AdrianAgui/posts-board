import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { BackdropService } from '../../services/backdrop/backdrop.service';
import { LoaderService } from '../../services/loader/loader.service';
import { PostsService } from '../../services/posts/posts.service';

import { EditComponent } from './edit.component';

describe('EditComponent', () => {
  it('should be created', () => {
    const comp = new EditComponent(
      {} as Router,
      {} as PostsService,
      {} as BackdropService,
      {} as FormBuilder,
      {} as LoaderService,
      {} as ActivatedRoute
    );
    expect(comp).toBeDefined();
  });
});
