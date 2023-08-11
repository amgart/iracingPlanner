import { TestBed } from '@angular/core/testing';

import { UtilService } from './util.service';
import {Season} from "../../interfaces/Season";

describe('UtilService', () => {
  let service: UtilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UtilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should decode text', () => {
    const input = 'Hello+world%21';
    const expectedOutput = 'Hello world!';
    expect(service.decode(input)).toEqual(expectedOutput);
  });

  it('should sort series by name', () => {
    const input: Season[] = [
      { season_id: 1, seasonName: 'Season C' },
      { season_id: 2, seasonName: 'Season A' },
      { season_id: 3, seasonName: 'Season B' }
    ];
    const expectedOutput: Season[] = [
      { season_id: 2, seasonName: 'Season A' },
      { season_id: 3, seasonName: 'Season B' },
      { season_id: 1, seasonName: 'Season C' }
    ];
    expect(service.sortSeries(input)).toEqual(expectedOutput);
  });

  it('should get license from level', () => {
    expect(service.getLicenseFrom(1)).toEqual('R');
    expect(service.getLicenseFrom(2)).toEqual('D');
    expect(service.getLicenseFrom(3)).toEqual('C');
    expect(service.getLicenseFrom(4)).toEqual('B');
    expect(service.getLicenseFrom(5)).toEqual('A');
    expect(service.getLicenseFrom(6)).toEqual('Pro');
    expect(service.getLicenseFrom(7)).toEqual('7');
  });

  it('should get category', () => {
    expect(service.getCategory(1)).toEqual('Oval');
    expect(service.getCategory(2)).toEqual('Road');
    expect(service.getCategory(3)).toEqual('Dirt Oval');
    expect(service.getCategory(4)).toEqual('Dirt Road');
    expect(service.getCategory(5)).toEqual('5');
  });

  it('should get fixed or open setup', () => {
    expect(service.getFixedOpenSetup(true)).toEqual('Fixed');
    expect(service.getFixedOpenSetup(false)).toEqual('Open');
  });
});
