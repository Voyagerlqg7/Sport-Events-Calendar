import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
  IsArray,
  ValidateNested,
  IsInt,
} from 'class-validator';
import { Type } from '@nestjs/class-transformer';

export class CreatePlayerDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  name: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  position: string;
  @IsInt()
  @IsNotEmpty()
  number: number;
  @IsString()
  @IsNotEmpty()
  teamId: string;
}

export class CreatePlayersDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePlayerDto)
  players: CreatePlayerDto[];
}

export class UpdatePlayerDto {
  @IsOptional()
  @IsString()
  name?: string;
  @IsOptional()
  @IsString()
  position?: string | null;
  @IsOptional()
  @IsInt()
  number?: number | null;
  @IsOptional()
  @IsString()
  teamId?: string | null;
}
