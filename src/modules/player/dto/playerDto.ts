export class CreatePlayerDto {
  name: string;
  position?: string | null;
  number?: number | null;
  teamId?: string | null;
}

export class UpdatePlayerDto {
  name?: string;
  position?: string | null;
  number?: number | null;
  teamId?: string | null;
}
