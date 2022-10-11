interface Serie {
  minsr?: string;
  driverChanges?: boolean;
  year?: number;
  carNumberMap?: any;
  licgroupid?: number;
  seriesname?: string;
  whatshotimg?: string;
  allowedMembers?: any;
  currentTrack?: number;
  active?: boolean;
  show_ss_standings?: boolean;
  driverChangeRule: number;
  seriesid?: number;
  carclasses?: CarClasses[];
  isOfficial?: boolean;
  cars?: SerieCar[];
  restrictedByMember?: boolean;
  isFixedSetup?: boolean;
  seasonid?: number;
  lowerseasonshortname?: string;
  rookieseason?: string;
  serieslicgroupid?: number;
  reg_open_len_mins?: number;
  prefimg?: string;
  isRegionCompetition?: boolean;
  isClubAllowed?: boolean;
  minlicenselevel?: number;
  licenseEligible?: boolean;
  catid?: number;
  lowerseriesshortname?: string;
  seriesshortname?: string;
  ignoreLicenseForPractice?: boolean;
  end?: number;
  cautionTypeRoad?: number;
  seasonshortname?: string;
  maxlicenselevel?: number;
  start?: number;
  restrictedToCar?: boolean;
  islite?: boolean;
  cautionTypeOval?: number;
  tracks?: SerieTrack[];
  multiclass?: boolean;
  maxTeamDrivers?: number;
  isWorldCup?: boolean;
  restrictviewing?: boolean;
  complete?: boolean;
  category?: number;
  raceweek?: number;
  quarter?: number;
  minTeamDrivers?: number;

  // My params
  numOwnedTracks?: number;
  isSomeCarOwned?: boolean;
  categoryString?: string;
  licenseString?: string;
}