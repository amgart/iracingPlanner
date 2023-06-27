import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TrackComponent} from './track.component';
import {UtilService} from "../../../../services/util/util.service";
import {TrackService} from "../../../../services/track/track.service";

describe('TrackComponent', () => {
  let component: TrackComponent;
  let fixture: ComponentFixture<TrackComponent>;
  let utilService: UtilService;
  let trackService: TrackService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackComponent ],
      providers: [ UtilService, TrackService ]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackComponent);
    component = fixture.componentInstance;
    utilService = TestBed.inject(UtilService);
    trackService = TestBed.inject(TrackService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    spyOn(trackService, 'getTracksWithoutDuplicates').and.returnValue([]);
    expect(component).toBeTruthy();
  });

  it('should set checked value to true if track is owned', () => {
    spyOn(trackService, 'isOwned').and.returnValue(true);
    component.track = { track_id: 1, track_name: 'Track 1' };
    component.ngOnInit();
    expect(component.checked).toBeTrue();
  });

  it('should set checked value to false if track_id is not defined', () => {
    component.track = { track_name: 'Track 1' };
    component.ngOnInit();
    expect(component.checked).toBeFalse();
  });

  it('should call remove method if track is already owned and user unchecks the checkbox', () => {
    spyOn(trackService, 'remove');
    component.track = { track_id: 1, track_name: 'Track 1' };
    component.checked = true;
    component.onClick(component.track);
    expect(trackService.remove).toHaveBeenCalledWith(component.track);
  });

  it('should call save method if track is not owned and user checks the checkbox', () => {
    spyOn(trackService, 'save');
    component.track = { track_id: 1, track_name: 'Track 1' };
    component.onClick(component.track);
    expect(trackService.save).toHaveBeenCalledWith(component.track);
  });

  it('should set track as favorite and save it', () => {
    spyOn(trackService, 'save').and.stub();
    component.track = { package_id: 1, favorite: false };
    component.favorite(true);
    expect(component.track.favorite).toBe(true);
    expect(trackService.save).toHaveBeenCalledWith(component.track);
  });

  it('should set track as not favorite and save it', () => {
    spyOn(trackService, 'save').and.stub();
    component.track = { package_id: 1, favorite: true };
    component.favorite(false);
    expect(component.track.favorite).toBe(false);
    expect(trackService.save).toHaveBeenCalledWith(component.track);
  });
});
