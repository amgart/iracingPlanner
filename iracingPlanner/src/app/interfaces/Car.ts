export interface Car {
  ai_enabled?: boolean;
  allow_number_colors?: boolean;
  allow_number_font?: boolean;
  allow_sponsor1?: boolean;
  allow_sponsor2?: boolean;
  allow_wheel_color?: boolean;
  award_exempt?: boolean;
  car_dirpath?: string;
  car_id?: number;
  car_name?: string;
  car_name_abbreviated?: string;
  car_types?: any;
  car_weight?: number;
  categories?: any;
  created?: string;
  free_with_subscription?: boolean;
  has_headlights?: boolean;
  has_multiple_dry_tire_types?: boolean;
  hp?: number;
  max_power_adjust_pct?: number;
  max_weight_penalty_kg?: number;
  min_power_adjust_pct?: number;
  package_id?: number;
  patterns?: number;
  price?: number;
  retired?: boolean;
  search_filters?: string;
  sku?: number;

  // My params
  favorite?: boolean;
}
