export class AddGoalDto {
  playerId: string;
  playerName: string;
  minute: number;
  type?: 'penalty' | 'own' | 'regular';
  teamId?: string;
}

export class AddCardDto {
  playerId: string;
  minute: number;
  cardType: 'yellow' | 'second_yellow' | 'direct_red';
  relatedYellowCardId?: string;
}

export class UpdateResultDto {
  homeGoals?: number;
  awayGoals?: number;
  winner?: string;
  message?: string;
}
