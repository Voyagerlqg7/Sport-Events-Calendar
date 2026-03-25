import { Result } from '../domain/result.entity';
import { GoalViewDto } from '../../goal/view-dto/goal.view-dto';
import { CardViewDto } from '../../cards/view-dto/card.view-dto';

export class ResultWithDetailsViewDto {
  id: string;
  homeGoals: number;
  awayGoals: number;
  winner: string | null;
  message: string | null;
  goals: GoalViewDto[];
  cards: CardViewDto[];
  createdAt: Date;
  updatedAt: Date;

  static mapToView(this: void, result: Result): ResultWithDetailsViewDto {
    const dto = new ResultWithDetailsViewDto();
    dto.id = result.id;
    dto.homeGoals = result.homeGoals;
    dto.awayGoals = result.awayGoals;
    dto.winner = result.winner;
    dto.message = result.message;
    dto.goals = result.goals?.map(GoalViewDto.mapToView) || [];
    dto.cards = result.cards?.map(CardViewDto.mapToView) || [];
    dto.createdAt = result.createdAt;
    dto.updatedAt = result.updatedAt;
    return dto;
  }
}
