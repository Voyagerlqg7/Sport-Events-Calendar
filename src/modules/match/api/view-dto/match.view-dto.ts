import { Match } from '../../domain/match.entity';

export class MatchViewDto {
  id: string;
  season: number;
  status: string;
  timeVenueUTC: string;
  dateVenue: Date;
  group: number | null;
  stadium: string | null;
  homeTeamId: string;
  awayTeamId: string;
  stageId: string;
  resultId: string | null;
  metadata: any;
  createdAt: Date;
  updatedAt: Date;

  static mapToView(match: Match): MatchViewDto {
    const dto = new MatchViewDto();
    dto.id = match.id;
    dto.season = match.season;
    dto.status = match.status;
    dto.timeVenueUTC = match.timeVenueUTC;
    dto.dateVenue = match.dateVenue;
    dto.group = match.group;
    dto.stadium = match.stadium;
    dto.homeTeamId = match.homeTeamId;
    dto.awayTeamId = match.awayTeamId;
    dto.stageId = match.stageId;
    dto.resultId = match.resultId;
    dto.metadata = match.metadata;
    dto.createdAt = match.createdAt;
    dto.updatedAt = match.updatedAt;
    return dto;
  }
}
