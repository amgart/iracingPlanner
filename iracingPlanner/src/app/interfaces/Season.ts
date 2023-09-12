import {CarRestriction} from "iracing-api/lib/types/car";
import {RaceTimeDescriptor} from "iracing-api/lib/types/common";
import {Track, TrackState} from "iracing-api/lib/types/track";
import {Weather} from "iracing-api/lib/types";

export interface Season {

  active?: boolean;
  allowed_season_members?: unknown | null;
  car_class_ids?: Array<number>;
  car_types?: Array<{
    car_type?: string;
  }>;
  car_restrictions?: Array<CarRestriction>;
  caution_laps_do_not_count?: boolean;
  complete?: boolean;
  cross_license?: boolean;
  driver_changes?: boolean;
  drops?: number;
  enable_pitlane_collisions?: boolean;
  fixed_setup?: boolean;
  green_white_checkered_limit?: number;
  grid_by_class?: boolean;
  ignore_license_for_practice?: boolean;
  incident_limit?: number;
  incident_warn_mode?: any;
  incident_warn_param1?: number;
  incident_warn_param2?: number;
  is_heat_racing?: boolean;
  license_group?: number;
  license_group_types?: Array<{
    license_group_type?: number;
  }>;
  lucky_dog?: boolean;
  max_team_drivers?: number;
  max_weeks?: number;
  min_team_drivers?: number;
  multiclass?: boolean;
  must_use_diff_tire_types_in_race?: boolean;
  next_race_session?: any;
  num_opt_laps?: number;
  official?: boolean;
  op_duration?: number;
  open_practice_session_type_id?: number;
  qualifier_must_start_race?: boolean;
  raceTimeDescriptors?: Array<RaceTimeDescriptor>;
  race_week?: number;
  race_week_to_make_divisions?: number;
  reg_user_count?: number;
  region_competition?: boolean;
  restrict_by_member?: boolean;
  restrict_to_car?: boolean;
  restrict_viewing?: boolean;
  schedule_description?: string;
  schedules?: any;
  season_id?: number;
  season_name?: string;
  season_quarter?: number;
  season_short_name?: string;
  season_year?: number;
  send_to_open_practice?: boolean;
  series_id?: number;
  short_parade_lap?: boolean;
  start_date?: string;
  start_on_qual_tire?: boolean;
  start_zone?: boolean;
  track?: Track;
  track_state?: TrackState;
  track_types?: Array<{
    trackType?: string;
  }>;
  unsport_conduct_rule_mode?: number;
  weather?: Weather;

  // My params
  numOwnedTracks?: number;
  isSomeCarOwned?: boolean;
  categoryString?: string;
  licenseString?: string;
  setupString?: string;
  isSomeContentFavorite?: boolean
}
