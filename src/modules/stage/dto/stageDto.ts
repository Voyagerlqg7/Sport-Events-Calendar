import {
  IsString,
  IsInt,
  IsUUID,
  MaxLength,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { Type } from '@nestjs/class-transformer';

export class CreateStageDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  code: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  name: string;

  @IsNotEmpty()
  @IsInt()
  ordering: number;

  @IsNotEmpty()
  @IsUUID()
  competitionId: string;
}

export class CreateStagesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateStageDto)
  stages: CreateStageDto[];
}

export class UpdateStageDto {
  @IsString()
  @MaxLength(50)
  code?: string;
  @IsNotEmpty()
  @IsString()
  name?: string;
  @IsNotEmpty()
  @IsInt()
  ordering?: number;
  @IsNotEmpty()
  @IsString()
  competitionId?: string;
}
