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
import { CreateCompetitionCommand } from '../application/CRUD_UseCases/createCompetition';
import { CompetitionViewDto } from './view-dto/competition.view-dto';
import { UpdateCompetitionCommand } from '../application/CRUD_UseCases/updateCompetition';
import { GetCompetitionCommand } from '../application/CRUD_UseCases/getCompetition';

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
  createStage(@Param('competitionId') id: string) {}

  @Get(':competitionId/stages')
  getStages(@Param('competitionId') id: string) {
    // Get all stages from competition
  }

  @Post(':competitionId/stages/:stageId/matches')
  createMatch(
    @Param('competitionId') compId: string,
    @Param('stageId') stageId: string,
  ) {}
}
