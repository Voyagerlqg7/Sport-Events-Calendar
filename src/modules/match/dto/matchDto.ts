export class CreateMatchDto {
  season: number;
  status: string;
  timeVenueUTC: string;
  dateVenue: Date;
  group?: number | null;
  stadium?: string | null;
  homeTeamId: string;
  awayTeamId: string;
  stageId: string;
}

export class UpdateMatchDto {
  season?: number;
  status?: string;
  timeVenueUTC?: string;
  dateVenue?: Date;
  group?: number | null;
  stadium?: string | null;
  homeTeamId?: string;
  awayTeamId?: string;
  stageId?: string;
}
