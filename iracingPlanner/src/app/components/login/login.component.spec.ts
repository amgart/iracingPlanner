import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {LoginService} from "../../services/login/login.service";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterTestingModule} from "@angular/router/testing";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let loginService: LoginService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, RouterTestingModule],
      declarations: [ LoginComponent ],
      providers: [ LoginService ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    loginService = TestBed.inject(LoginService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a defined form', () => {
    expect(component.form).toBeDefined();
  });

  it('should have a user input field', () => {
    const userInput = fixture.nativeElement.querySelector('input[name="user"]');
    expect(userInput).toBeTruthy();
  });

  it('should have a password input field', () => {
    const passwordInput = fixture.nativeElement.querySelector('input[name="password"]');
    expect(passwordInput).toBeTruthy();
  });

  it('should navigate to dashboard when user is logged in', () => {
    spyOn(component['_router'], 'navigate');
    spyOn(loginService, 'login').and.returnValue(true);
    component.form.setValue({ user: 'testuser', password: 'testpassword' });
    component.login();
    expect(component['_router'].navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should not navigate to dashboard when user is not logged in', () => {
    spyOn(component['_router'], 'navigate');
    spyOn(loginService, 'login').and.returnValue(false);
    component.form.setValue({ user: 'testuser', password: 'testpassword' });
    component.login();
    expect(component['_router'].navigate).not.toHaveBeenCalled();
  });

  it('should set form values from stored credentials', () => {
    spyOn(loginService, 'getStoredCredentials').and.returnValue({ user: 'testuser', password: 'testpassword' });
    component.ngOnInit();
    expect(component.form.get('user')?.value).toBe('testuser');
    expect(component.form.get('password')?.value).toBe('testpassword');
  });

  it('should navigate to dashboard when offline mode is clicked', () => {
    spyOn(component['_router'], 'navigate');
    component.offlineMode();
    expect(component['_router'].navigate).toHaveBeenCalledWith(['/dashboard']);
  });
});
