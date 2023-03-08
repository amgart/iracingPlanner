import { TestBed } from '@angular/core/testing';

import { LoginService } from './login.service';
import {StoreService} from "../store/store.service";

describe('LoginService', () => {
  let service: LoginService;
  let storeServiceSpy: jasmine.SpyObj<StoreService>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('StoreService', ['set', 'get']);

    TestBed.configureTestingModule({
      providers: [
        LoginService,
        { provide: StoreService, useValue: spy }
      ]
    });

    service = TestBed.inject(LoginService);
    storeServiceSpy = TestBed.inject(StoreService) as jasmine.SpyObj<StoreService>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store credentials on login', () => {
    const user = 'testuser';
    const password = 'testpassword';
    service.login(user, password);
    expect(storeServiceSpy.set).toHaveBeenCalledWith('login', -1, { user, password });
  });

  it('should retrieve stored credentials', () => {
    const credentials = { user: 'testuser', password: 'testpassword' };
    storeServiceSpy.get.and.returnValue(credentials);
    const result = service.getStoredCredentials();
    expect(storeServiceSpy.get).toHaveBeenCalledWith('login', -1);
    expect(result).toEqual(credentials);
  });

  it('should encrypt password', () => {
    const hashedPwd = service.encryptPassword('CLunky@iracing.Com', 'MyPassWord');
    expect(hashedPwd).toEqual('xGKecAR27ALXNuMLsGaG0v5Q9pSs2tZTZRKNgmHMg+Q=')
  });
});
