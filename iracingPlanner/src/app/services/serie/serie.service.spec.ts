import { TestBed } from '@angular/core/testing';

import { SeasonService } from './season.service';
import {UtilService} from "../util/util.service";
import {Season} from "../../interfaces/Season";

describe('SeasonService', () => {
  let service: SeasonService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SeasonService,
        UtilService
      ]
    });
    service = TestBed.inject(SeasonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return seasons with 12 races', () => {
    const result: Season[] = service.findSeries();
    expect(result.length).toBeGreaterThan(0);

    result.forEach(season => {
      expect(season.schedules?.length).toEqual(12);
    });
  });
});
