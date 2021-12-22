import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { ApiService } from './api.service';

describe('ApiService', () => {
  let apiService: ApiService;
  let httpSpy: jasmine.SpyObj<HttpClient>;

  const url = 'url.com';

  beforeEach(() => {
    const spy = jasmine.createSpyObj('HttpClient', [
      'get',
      'put',
      'post',
      'delete',
    ]);

    TestBed.configureTestingModule({
      providers: [ApiService, { provide: HttpClient, useValue: spy }],
    });

    apiService = TestBed.inject(ApiService);
    httpSpy = TestBed.inject(HttpClient) as jasmine.SpyObj<HttpClient>;

    httpSpy.get.and.returnValue(of({}));
    httpSpy.post.and.returnValue(of({}));
    httpSpy.put.and.returnValue(of({}));
    httpSpy.delete.and.returnValue(of({}));
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  describe('ApiService', () => {
    it('should get data', () => {
      apiService.get(url).subscribe();
      expect(httpSpy.get).toHaveBeenCalled();
    });
    it('should post data', () => {
      apiService.post(url, {}).subscribe();
      expect(httpSpy.post).toHaveBeenCalled();
    });
    it('should put data', () => {
      apiService.put(url, {}).subscribe();
      expect(httpSpy.put).toHaveBeenCalled();
    });
    it('should delete data', () => {
      apiService.delete(url).subscribe();
      expect(httpSpy.delete).toHaveBeenCalled();
    });
  });
});
