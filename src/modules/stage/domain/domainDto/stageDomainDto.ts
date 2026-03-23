export class CreateStageDomainDto {
  code: string;
  name: string;
  ordering: number;
  competitionId: string;
}

export class UpdateStageDomainDto {
  code?: string;
  name?: string;
  ordering?: number;
  competitionId?: string;
}
