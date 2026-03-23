export class CreateTeamDomainDto {
  name: string;
  officialName?: string | null;
  slug: string;
  abbreviation: string;
  teamCountryCode: string;
  stagePosition?: number | null;
}

export class UpdateTeamDomainDto {
  name?: string;
  officialName?: string | null;
  slug?: string;
  abbreviation?: string;
  teamCountryCode?: string;
  stagePosition?: number | null;
}
