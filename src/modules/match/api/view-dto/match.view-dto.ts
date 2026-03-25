import { Match } from '../../domain/match.entity';
import { TeamViewDto } from '../../../team/api/view-dto/team.view-dto';
import { ResultWithDetailsViewDto } from '../../../result/view-dto/result.view-dto';

export class MatchViewDto {
  id: string;
  season: number;
  status: string;
  timeVenueUTC: string;
  dateVenue: Date;
  group: number | null;
  stadium: string | null;
  stageId: string;
  homeTeam: TeamViewDto | null;
  awayTeam: TeamViewDto | null;
  result: ResultWithDetailsViewDto | null;
  metadata: any;
  createdAt: Date;
  updatedAt: Date;

  static mapToView(this: void, match: Match): MatchViewDto {
    const dto = new MatchViewDto();
    dto.id = match.id;
    dto.season = match.season;
    dto.status = match.status;
    dto.timeVenueUTC = match.timeVenueUTC;
    dto.dateVenue = match.dateVenue;
    dto.group = match.group;
    dto.stadium = match.stadium;
    dto.stageId = match.stageId;
    dto.homeTeam = match.homeTeam
      ? TeamViewDto.mapToView(match.homeTeam)
      : null;
    dto.awayTeam = match.awayTeam
      ? TeamViewDto.mapToView(match.awayTeam)
      : null;
    dto.result = match.result
      ? ResultWithDetailsViewDto.mapToView(match.result)
      : null;
    dto.metadata = match.metadata;
    dto.createdAt = match.createdAt;
    dto.updatedAt = match.updatedAt;
    return dto;
  }
}
