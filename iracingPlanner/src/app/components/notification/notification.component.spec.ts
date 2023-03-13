import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { NotificationComponent } from './notification.component';
import {ApplicationService} from "../../services/application/application.service";

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let appService: ApplicationService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationComponent ],
      providers: [ ApplicationService ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotificationComponent);
    appService = TestBed.inject(ApplicationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should detect available update', fakeAsync(() => {
    spyOn(appService, 'getCurrentVersion').and.returnValue('1.0.0');
    spyOn(appService, 'getLatestVersion').and.returnValue(Promise.resolve({tag_name: '1.0.1'}));
    component.ngOnInit();
    fixture.detectChanges();
    tick();
    expect(fixture.componentInstance.updateAvailable).toBeTrue();
  }));

  it('should not detect available update', fakeAsync(() => {
    spyOn(appService, 'getCurrentVersion').and.returnValue('1.0.0');
    spyOn(appService, 'getLatestVersion').and.returnValue(Promise.resolve({tag_name: '1.0.0'}));
    component.ngOnInit();
    fixture.detectChanges();
    tick();
    expect(fixture.componentInstance.updateAvailable).toBeFalse();
  }));

  it('should handle failed request for latest version', fakeAsync(() => {
    spyOn(appService, 'getCurrentVersion').and.returnValue('1.0.0');
    spyOn(appService, 'getLatestVersion').and.returnValue(Promise.reject('Error'));
    component.ngOnInit();
    fixture.detectChanges();
    tick();
    expect(fixture.componentInstance.updateAvailable).toBeFalse();
  }));
});
