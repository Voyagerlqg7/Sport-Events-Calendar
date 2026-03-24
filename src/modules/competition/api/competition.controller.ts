import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import {
  CreateCompetitionDto,
  UpdateCompetitionDto,
} from '../dto/competitionDto';
import { CreateCompetitionCommand } from '../application/CRUD_UseCases/create-competition.usecase';
import { CompetitionViewDto } from './view-dto/competition.view-dto';
import { UpdateCompetitionCommand } from '../application/CRUD_UseCases/update-competition.usecase';
import { GetCompetitionCommand } from '../application/CRUD_UseCases/get-competition.usecase';
import { CreateStagesDto } from '../../stage/dto/stageDto';
import { StageViewDto } from '../../stage/api/view-dto/stage.view-dto';
import { CreateStagesForCompetitionCommand } from '../application/BusinessUseCase/create-stages-for-competition.usecase';
import { CreateMatchesDto } from '../../match/dto/matchDto';
import { MatchViewDto } from '../../match/api/view-dto/match.view-dto';
import { DomainException } from '../../../core/exceptions/domain.exceptions';
import { CreateMatchesForStagesCommand } from '../application/BusinessUseCase/create-matches-for-stages.usecase';

@Controller('competition')
export class CompetitionController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  async getAllCompetitions() {
    //TODO: Query repository may be?
  }

  @Get(':competitionId')
  async getCompetitionsById(
    @Param('competitionId') competitionId: string,
  ): Promise<CompetitionViewDto> {
    return await this.commandBus.execute<
      GetCompetitionCommand,
      CompetitionViewDto
    >(new GetCompetitionCommand(competitionId));
  }

  @Post()
  async createCompetition(
    @Body() createDto: CreateCompetitionDto,
  ): Promise<CompetitionViewDto> {
    return this.commandBus.execute<
      CreateCompetitionCommand,
      CompetitionViewDto
    >(
      new CreateCompetitionCommand({
        originCompetitionId: createDto.originCompetitionId,
        originCompetitionName: createDto.originCompetitionName,
      }),
    );
  }

  @Put(':competitionId')
  async updateCompetition(
    @Body() updateDto: UpdateCompetitionDto,
  ): Promise<void> {
    await this.commandBus.execute<
      UpdateCompetitionCommand,
      UpdateCompetitionDto
    >(
      new UpdateCompetitionCommand({
        originCompetitionId: updateDto.originCompetitionId,
        originCompetitionName: updateDto.originCompetitionName,
      }),
    );
  }

  @Delete(':competitionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCompetition() {}

  //entry point for creating a stages -> match
  @Post(':competitionId/stages')
  async createStages(@Body() dto: CreateStagesDto): Promise<StageViewDto[]> {
    const command = new CreateStagesForCompetitionCommand(dto);
    return this.commandBus.execute(command);
  }

  @Get(':competitionId/stages')
  async getStages(@Param('competitionId') id: string) {}

  @Post(':competitionId/stages/:stageId/matches')
  async createMatches(
    @Param('competitionId') competitionId: string,
    @Param('stageId') stageId: string,
    @Body() dto: CreateMatchesDto,
  ): Promise<MatchViewDto[]> {
    const invalidMatches = dto.matches.filter((m) => m.stageId !== stageId);

    if (invalidMatches.length > 0) {
      throw DomainException.badRequest(
        `StageId in URL (${stageId}) must match stageId in all matches. ` +
          `Mismatch found in ${invalidMatches.length} matches.`,
      );
    }

    const command = new CreateMatchesForStagesCommand(competitionId, dto);
    return this.commandBus.execute(command);
  }

  @Get(':competitionId/stages/:stageId/matches')
  async getMatches(
    @Param('competitionId') compId: string,
    @Param('stageId') stageId: string,
  ) {}
}
