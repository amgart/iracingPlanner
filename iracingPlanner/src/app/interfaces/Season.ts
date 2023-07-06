import {CarRestriction} from "iracing-api/lib/types/car";
import {RaceTimeDescriptor} from "iracing-api/lib/types/common";
import {Track, TrackState} from "iracing-api/lib/types/track";
import {Weather} from "iracing-api/lib/types";

export interface Season {

  active?: boolean;
  allowedSeasonMembers?: unknown | null;
  carClassIds?: Array<number>;
  carTypes?: Array<{
    carType?: string;
  }>;
  carRestrictions?: Array<CarRestriction>;
  cautionLapsDoNotCount?: boolean;
  complete?: boolean;
  crossLicense?: boolean;
  driverChanges?: boolean;
  drops?: number;
  enablePitLaneCollisions?: boolean;
  fixedSetup?: boolean;
  greenWhiteCheckeredLimit?: number;
  gridByClass?: boolean;
  ignoreLicenseForPractice?: boolean;
  incidentLimit?: number;
  incidentWarnMode?: any;
  incidentWarnParam1?: number;
  incidentWarnParam2?: number;
  isHeatRacing?: boolean;
  licenseGroup?: number;
  licenseGroupTypes?: Array<{
    licenseGroupType?: number;
  }>;
  luckyDog?: boolean;
  maxTeamDrivers?: number;
  maxWeeks?: number;
  minTeamDrivers?: number;
  multiclass?: boolean;
  mustUseDiffTireTypesInRace?: boolean;
  nextRaceSession?: any;
  numOptLaps?: number;
  official?: boolean;
  opDuration?: number;
  openPracticeSessionTypeId?: number;
  qualifierMustStartRace?: boolean;
  raceTimeDescriptors?: Array<RaceTimeDescriptor>;
  raceWeek?: number;
  raceWeekToMakeDivisions?: number;
  regUserCount?: number;
  regionCompetition?: boolean;
  restrictByMember?: boolean;
  restrictToCar?: boolean;
  restrictViewing?: boolean;
  scheduleDescription?: string;
  schedules?: any;
  seasonId?: number;
  seasonName?: string;
  seasonQuarter?: number;
  seasonShortName?: string;
  seasonYear?: number;
  sendToOpenPractice?: boolean;
  seriesId?: number;
  shortParadeLaps?: boolean;
  startDate?: string;
  startOnQualTire?: boolean;
  startZone?: boolean;
  track?: Track;
  trackState?: TrackState;
  trackTypes?: Array<{
    trackType?: string;
  }>;
  unsportConductRuleMode?: number;
  weather?: Weather;

  // My params
  numOwnedTracks?: number;
  isSomeCarOwned?: boolean;
  categoryString?: string;
  licenseString?: string;
  setupString?: string;
}
