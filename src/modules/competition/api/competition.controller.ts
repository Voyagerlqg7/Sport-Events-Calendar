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
import { CommandBus, QueryBus } from '@nestjs/cqrs';
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
import { CreateMatchesDto } from '../../match/dto/match-dto';
import { MatchViewDto } from '../../match/api/view-dto/match.view-dto';
import { DomainException } from '../../../core/exceptions/domain.exceptions';
import { CreateMatchesForStagesCommand } from '../application/BusinessUseCase/create-matches-for-stages.usecase';
import { GetCompetitionWithStagesQueryCommand } from '../application/BusinessUseCase/get-competitions-with-stages.usecase';
import { CompetitionWithStagesViewDto } from './view-dto/competition.view-dto';
import { DeleteCompetitionCommand } from '../application/CRUD_UseCases/delete-competition.usecase';
import { GetCompetitionByOriginIdCommand } from '../application/BusinessUseCase/get-competition-by-origin-id.usecase';
import { CompetitionWithMatchesViewDto } from './view-dto/competition.view-dto';
import { GetCompetitionWithStagesAndMatchesQuery } from '../application/BusinessUseCase/get-competition-with-stages-and-matches-use.case';
import { GetCompetitionFullDetailsQuery } from '../application/BusinessUseCase/get-competition-with-matches-and-teams.usecase';

@Controller('competition')
export class CompetitionController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

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
    @Param('competitionId') competitionId: string,
    @Body() updateDto: UpdateCompetitionDto,
  ): Promise<CompetitionViewDto> {
    const command = new UpdateCompetitionCommand(competitionId, updateDto);
    return this.commandBus.execute(command);
  }

  @Delete(':competitionId')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCompetition(
    @Param('competitionId') competitionId: string,
  ): Promise<void> {
    const command = new DeleteCompetitionCommand(competitionId);
    await this.commandBus.execute(command);
  }

  //BusinessUseCases
  //entry points for creating a stages -> match
  @Get('origin/:originId')
  async getCompetitionByOriginId(
    @Param('originId') originId: string,
  ): Promise<CompetitionWithStagesViewDto> {
    return this.queryBus.execute(new GetCompetitionByOriginIdCommand(originId));
  }

  @Post(':competitionId/stages')
  async createStages(
    @Param('competitionId') competitionId: string,
    @Body() dto: CreateStagesDto,
  ): Promise<StageViewDto[]> {
    const stagesWithCompetitionId = dto.stages.map((stage) => ({
      ...stage,
      competitionId: competitionId,
    }));

    const command = new CreateStagesForCompetitionCommand({
      stages: stagesWithCompetitionId,
    });

    return this.commandBus.execute(command);
  }

  @Get(':competitionId/stages')
  async getStages(
    @Param('competitionId') id: string,
  ): Promise<CompetitionWithStagesViewDto> {
    const command = new GetCompetitionWithStagesQueryCommand(id);
    return this.commandBus.execute(command);
  }

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

  @Get(':id/with-matches')
  async getCompetitionWithMatches(
    @Param('id') id: string,
  ): Promise<CompetitionWithMatchesViewDto> {
    return this.queryBus.execute(
      new GetCompetitionWithStagesAndMatchesQuery(id),
    );
  }

  @Get(':id/full-details')
  async getCompetitionFullDetails(
    @Param('id') id: string,
  ): Promise<CompetitionViewDto> {
    return this.queryBus.execute(new GetCompetitionFullDetailsQuery(id));
  }
}
