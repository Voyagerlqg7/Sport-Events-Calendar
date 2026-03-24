import {
  IsString,
  MaxLength,
  IsNotEmpty,
} from 'class-validator';

export class CreateCompetitionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  originCompetitionId: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  originCompetitionName: string;
}
export class UpdateCompetitionDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  originCompetitionId: string;
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  originCompetitionName: string;
}
