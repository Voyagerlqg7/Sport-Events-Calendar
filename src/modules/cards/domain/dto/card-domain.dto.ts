export class CreateCardDomainDto {
  minute: number;
  cardType: 'yellow' | 'second_yellow' | 'direct_red';
  resultId: string;
  playerId: string;
  relatedYellowCardId?: string;
}
