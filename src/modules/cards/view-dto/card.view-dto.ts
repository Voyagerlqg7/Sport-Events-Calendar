import { Card } from '../domain/cards.entity';

export class CardViewDto {
  id: string;
  cardType: string; // 'yellow', 'second_yellow', 'direct_red'
  minute: number;
  playerId: string;
  playerName?: string;

  static mapToView(this: void, card: Card): CardViewDto {
    const dto = new CardViewDto();
    dto.id = card.id;
    dto.cardType = card.cardType;
    dto.minute = card.minute;
    dto.playerId = card.playerId;
    return dto;
  }
}
