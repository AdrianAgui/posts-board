import { EditComponent } from './edit.component';

import { ActivatedRoute, Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoaderService } from './../../services/loader/loader.service';
import { BackdropService } from './../../services/backdrop/backdrop.service';
import { PostsService } from './../../services/posts/posts.service';
import { FormBuilder } from '@angular/forms';
import { MockPostsService } from '../../mocks/posts.service.mock';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Subject } from 'rxjs';

describe('EditComponent', () => {
  let comp: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  let routerSpy = jasmine.createSpyObj({ navigate: () => {} });
  let backdropServiceSpy = jasmine.createSpyObj('BackdropService', [
    'enable',
    'disable',
  ]);
  let loaderSpy = jasmine.createSpyObj({ display: () => {}, hide: () => {} });
  let activatedRouteSpy = jasmine.createSpyObj('ActivatedRoute', ['']);

  activatedRouteSpy.params = new Subject();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [EditComponent],
      providers: [
        EditComponent,
        { provide: Router, useValue: routerSpy },
        { provide: PostsService, useClass: MockPostsService },
        { provide: BackdropService, useValue: backdropServiceSpy },
        { provide: FormBuilder },
        { provide: LoaderService, useValue: loaderSpy },
        { provide: ActivatedRoute, useValue: activatedRouteSpy },
      ],
    });

    fixture = TestBed.createComponent(EditComponent);
    comp = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(comp).toBeDefined();
  });
});
