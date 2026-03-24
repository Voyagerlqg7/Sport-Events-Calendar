import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from '@nestjs/class-transformer';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  name: string;
  @IsString()
  officialName?: string | null;
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  slug: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(30)
  abbreviation: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(20)
  teamCountryCode: string;
  @IsOptional()
  stagePosition?: number | null;
}

export class CreateTeamsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTeamDto)
  teams: CreateTeamDto[];
}

export class UpdateTeamDto {
  @IsOptional()
  @IsString()
  @MaxLength(40)
  name?: string;
  @IsOptional()
  officialName?: string | null;
  @IsOptional()
  @IsString()
  slug?: string;
  @IsOptional()
  abbreviation?: string;
  @IsOptional()
  teamCountryCode?: string;
  @IsOptional()
  stagePosition?: number | null;
}
