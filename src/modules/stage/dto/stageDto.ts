//TODO: check class validator for every entity
// stage/api/dto/create-stage.dto.ts
//import { ApiProperty } from '@nestjs/swagger';
//import { IsString, IsInt, IsUUID, MaxLength } from 'class-validator';

export class CreateStageDto {
  code: string;
  name: string;
  ordering: number;
  competitionId: string;
}

export class UpdateStageDto {
  code?: string;
  name?: string;
  ordering?: number;
  competitionId?: string;
}
