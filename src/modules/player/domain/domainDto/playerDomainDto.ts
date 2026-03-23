export class CreatePlayerDomainDto {
  name: string;
  position?: string | null;
  number?: number | null;
  teamId?: string | null;
}

export class UpdatePlayerDomainDto {
  name?: string;
  position?: string | null;
  number?: number | null;
  teamId?: string | null;
}
