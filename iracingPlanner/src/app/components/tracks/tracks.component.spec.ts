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
    }).compileComponents();

    fixture = TestBed.createComponent(TracksComponent);
    trackService = TestBed.inject(TrackService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
