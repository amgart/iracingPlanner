import { TestBed } from '@angular/core/testing';

import { StoreService } from './store.service';

describe('StoreService', () => {
  let service: StoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete a value from the store', () => {
    const objectType = 'testObject';
    const key = 1;
    const value = {name: 'Test Object', value: 42};

    service.set(objectType, key, value);
    service.delete(objectType, key);
    const retrievedValue = service.get(objectType, key);

    expect(retrievedValue).toBeUndefined();
  });
});
