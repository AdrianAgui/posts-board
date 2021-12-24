import { CreateComponent } from './create.component';
import { Router } from '@angular/router';
import { ComponentFixture, fakeAsync, TestBed } from '@angular/core/testing';
import { LoaderService } from './../../services/loader/loader.service';
import { BackdropService } from './../../services/backdrop/backdrop.service';
import { PostsService } from './../../services/posts/posts.service';
import { FormBuilder } from '@angular/forms';
import { MockPostsService } from '../../mocks/posts.service.mock';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

describe('CreateComponent', () => {
  let comp: CreateComponent;
  let fixture: ComponentFixture<CreateComponent>;

  let routerSpy = jasmine.createSpyObj({ navigate: () => {} });
  let backdropServiceSpy = jasmine.createSpyObj('BackdropService', [
    'enable',
    'disable',
  ]);
  let loaderSpy = jasmine.createSpyObj({ display: () => {}, hide: () => {} });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [FontAwesomeModule],
      declarations: [CreateComponent],
      providers: [
        CreateComponent,
        { provide: Router, useValue: routerSpy },
        { provide: PostsService, useClass: MockPostsService },
        { provide: BackdropService, useValue: backdropServiceSpy },
        { provide: FormBuilder },
        { provide: LoaderService, useValue: loaderSpy },
      ],
    });

    fixture = TestBed.createComponent(CreateComponent);
    comp = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(comp).toBeDefined();
  });

  describe('Init component', () => {
    it('should init form and backdrop', () => {
      comp.ngOnInit();

      expect(backdropServiceSpy.enable).toHaveBeenCalled();
    });

    it('should update validity from form changes', fakeAsync(() => {
      comp.form.controls['title'].setValue('title');
      comp.form.controls['body'].setValue('body');

      expect(comp.form.status).toBe('VALID');
    }));
  });

  describe('Create post', () => {
    it('should remove form input content', () => {
      comp.form.controls['title'].setValue('title');
      comp.form.controls['body'].setValue('body');

      comp.createPost();

      expect(comp.submitted).toBeTrue();
      expect(loaderSpy.display).toHaveBeenCalled();
      expect(routerSpy.navigate).toHaveBeenCalled();
      expect(backdropServiceSpy.disable).toHaveBeenCalled();
    });
  });

  describe('Reset form', () => {
    it('should remove form input content', () => {
      comp.reset();
      const title = comp.form.controls['title'].value;
      const body = comp.form.controls['body'].value;

      expect(comp.submitted).toBeFalse();
      expect(title).toBeNull();
      expect(body).toBeNull();
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
