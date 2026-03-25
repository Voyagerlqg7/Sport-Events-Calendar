export class CreateGoalDomainDto {
  playerName: string;
  minute: number;
  type: string;
  resultId: string;
  playerId: string;
  teamId: string | null;
}
