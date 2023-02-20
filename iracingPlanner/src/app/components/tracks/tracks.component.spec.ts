import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracksComponent } from './tracks.component';
import {TrackService} from "../../services/track/track.service";

describe('TracksComponent', () => {
  let component: TracksComponent;
  let fixture: ComponentFixture<TracksComponent>;
  let trackService: TrackService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TracksComponent ],
      providers: [ TrackService ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TracksComponent);
    component = fixture.componentInstance;
    trackService = TestBed.inject(TrackService);
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve tracks from the service', () => {
    // spyOn(trackService, 'getTracksWithoutDuplicates').and.returnValue(of([
    //       { track_id: 1, track_name: 'Track 1' },
    //       { track_id: 2, track_name: 'Track 2' }
    //     ]));
    //     //component.ngOnInit();
    expect(component.tracks.length).toBe(2);
    expect(component.tracks[0].track_name).toBe('Track 1');
    expect(component.tracks[1].track_name).toBe('Track 2');
  });
});
