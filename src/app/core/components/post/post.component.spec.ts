import { PostComponent } from './post.component';
import { Router } from '@angular/router';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('PostComponent', () => {
  let comp: PostComponent;
  let fixture: ComponentFixture<PostComponent>;
  let routerSpy = jasmine.createSpyObj({ navigate: () => {} });

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostComponent],
      providers: [PostComponent, { provide: Router, useValue: routerSpy }],
    });

    fixture = TestBed.createComponent(PostComponent);
    comp = fixture.componentInstance;
  });

  it('should be created', () => {
    expect(comp).toBeDefined();
  });

  describe('Open detail modal', () => {
    it('should navigate to router outlet modal', () => {
      comp.openDetailsModal(1);
      expect(routerSpy.navigate).toHaveBeenCalled();
    });
  });

  describe('Open edit modal', () => {
    it('should navigate to router outlet modal', () => {
      comp.openEditModal(1);
      expect(routerSpy.navigate).toHaveBeenCalled();
    });
  });
});
