import { TestBed } from '@angular/core/testing';

import { HttpClientService } from './http-client.service';

describe('HttpClientService', () => {
  let service: HttpClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should handle failed request for latest version', (done: DoneFn) => {
    spyOn(window, 'fetch').and.returnValue(Promise.reject('Error'));
    const httpClientService = new HttpClientService();
    httpClientService.getLatestVersion().then(() => {
      fail('Expected an error, but none was thrown');
      done();
    }).catch(error => {
      expect(error).toBeDefined();
      done();
    });
  });

});
