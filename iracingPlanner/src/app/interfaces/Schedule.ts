import {Track} from "./Track";

export interface Schedule {
  season_id?: number;
  race_week_num?: number;
  series_id?: number;
  series_name?: string;
  season_name?: string;
  schedule_name?: string;
  start_date?: string;
  simulated_time_multiplier?: number;
  race_lap_limit?: any;
  race_time_limit?: any;
  start_type?: string;
  restart_type?: string;
  qual_attached?: boolean;
  full_course_cautions?: boolean;
  special_event_type?: any;
  start_zone?: boolean;
  enable_pitlane_collisions?: boolean;
  track?: Track;
  weather?: any;
  track_state?: any;
  race_time_descriptors?: any;
  car_restrictions?: any;
}
