import {
  IsString,
  IsInt,
  MaxLength,
  IsNotEmpty,
  IsDate,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMatchDto {
  @IsInt()
  @IsNotEmpty()
  season: number;
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  status: string;
  @IsString()
  @IsNotEmpty()
  timeVenueUTC: string;
  @IsDate()
  @IsNotEmpty()
  dateVenue: Date;
  group?: number | null;
  stadium?: string | null;
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  homeTeamId: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  awayTeamId: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  stageId: string;
}

export class CreateMatchesDto {
  @IsArray()
  @ValidateNested()
  @Type(() => CreateMatchDto)
  matches: CreateMatchDto[];
}

export class UpdateMatchDto {
  @IsInt()
  @IsNotEmpty()
  season?: number;
  @IsString()
  @IsNotEmpty()
  @MaxLength(50)
  status?: string;
  @IsString()
  @IsNotEmpty()
  timeVenueUTC?: string;
  @IsDate()
  @IsNotEmpty()
  dateVenue?: Date;
  group?: number | null;
  stadium?: string | null;
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  homeTeamId?: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  awayTeamId?: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  stageId?: string;
}
