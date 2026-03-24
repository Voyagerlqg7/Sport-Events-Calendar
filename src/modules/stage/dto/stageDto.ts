import {
  IsString,
  IsInt,
  IsUUID,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

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
