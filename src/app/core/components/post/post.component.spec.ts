import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostComponent } from './post.component';
import { Router } from '@angular/router';

describe('PostComponent', () => {
  it('should be created', () => {
    const comp = new PostComponent({} as Router);
    expect(comp).toBeDefined();
  });
});
