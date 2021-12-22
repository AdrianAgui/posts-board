import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('ApiService', [
      'get',
      'getById',
      'getName',
    ]);

    TestBed.configureTestingModule({
      providers: [ApiService, { provide: HttpClient, useValue: spy }],
    });

    apiService = TestBed.inject(ApiService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });
});
