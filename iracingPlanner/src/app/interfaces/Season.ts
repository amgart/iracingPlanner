import {SeriesSeason} from "iracing-api/lib/types/series";

export interface Season extends SeriesSeason {

  // My params
  numOwnedTracks?: number;
  isSomeCarOwned?: boolean;
  categoryString?: string;
  licenseString?: string;
  setupString?: string;
}
