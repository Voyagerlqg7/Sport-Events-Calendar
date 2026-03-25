import { Goal } from '../domain/goal.entity';

export class GoalViewDto {
  id: string;
  playerName: string;
  minute: number;
  type: string; // 'penalty', 'own', 'regular'
  playerId: string;
  teamId: string | null;

  static mapToView(this: void, goal: Goal): GoalViewDto {
    const dto = new GoalViewDto();
    dto.id = goal.id;
    dto.playerName = goal.playerName;
    dto.minute = goal.minute;
    dto.type = goal.type;
    dto.playerId = goal.playerId;
    dto.teamId = goal.teamId;
    return dto;
  }
}
