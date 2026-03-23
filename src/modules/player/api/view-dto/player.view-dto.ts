import { Player } from '../../domain/player.entity';

export class PlayerViewDto {
  id: string;
  name: string;
  position: string | null;
  number: number | null;
  teamId: string | null;
  createdAt: Date;
  updatedAt: Date;
  totalYellowCards?: number;
  totalRedCards?: number;

  static mapToView(
    player: Player,
    includeStats: boolean = false,
  ): PlayerViewDto {
    const dto = new PlayerViewDto();
    dto.id = player.id;
    dto.name = player.name;
    dto.position = player.position;
    dto.number = player.number;
    dto.teamId = player.teamId;
    dto.createdAt = player.createdAt;
    dto.updatedAt = player.updatedAt;

    if (includeStats) {
      dto.totalYellowCards = player.getTotalYellowCards();
      dto.totalRedCards = player.getTotalRedCards();
    }

    return dto;
  }
}
