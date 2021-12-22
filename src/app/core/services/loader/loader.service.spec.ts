import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('Loader', () => {
    it('should display', (done: DoneFn) => {
      service.show.subscribe((toggle) => {
        expect(toggle).toBeTrue();
        done();
      });
      service.display();
    });

    it('should hide', (done: DoneFn) => {
      service.show.subscribe((toggle) => {
        expect(toggle).toBeFalse();
        done();
      });
      service.hide();
    });
  });
});
