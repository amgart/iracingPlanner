interface Track {
  ai_enabled?: boolean;
  award_exempt?: boolean;
  category?: string;
  category_id?: number;
  closes?: string;
  config_name?: string;
  corners_per_lap?: number;
  created?: string;
  free_with_subscription?: boolean;
  fully_lit?: boolean;
  grid_stalls?: number;
  has_opt_path?: boolean;
  has_short_parade_lap?: boolean;
  has_start_zone?: boolean;
  has_svg_map?: boolean;
  is_dirt?: boolean;
  is_oval?: boolean;
  lap_scoring? : number;
  latitude?: number;
  location?: string;
  longitude?: number;
  max_cars?: number;
  night_lighting?: boolean;
  nominal_lap_time?: number;
  number_pitstalls?: number;
  opens?: string;
  package_id?: number;
  pit_road_speed_limit?: number;
  price?: number;
  priority?: number;
  purchasable?: boolean;
  qualify_laps?: number;
  restart_on_left?: boolean;
  retired?: boolean;
  search_filters?: string;
  site_url?: string;
  sku?: number;
  solo_laps?: number;
  start_on_left?: boolean;
  supports_grip_compound?: boolean;
  tech_track?: boolean;
  time_zone?: string;
  track_config_length?: number;
  track_dirpath?: string;
  track_id?: number;
  track_name?: string;
  track_types?: any;
}