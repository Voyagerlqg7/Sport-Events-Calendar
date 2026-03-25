import {
  Controller,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Post,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetMatchCommand } from '../application/CRUD_UseCases/getMatch';
import { UpdateMatchCommand } from '../application/CRUD_UseCases/updateMatch';
import { DeleteMatchCommand } from '../application/CRUD_UseCases/deleteMatch';
import { AddGoalToMatchCommand } from '../application/BusinessUseCases/add-goal-to-match.use-case';
import { AddCardToMatchCommand } from '../application/BusinessUseCases/add-card-to-match.use-case';
import { UpdateMatchResultCommand } from '../application/BusinessUseCases/update-match-result.use-case';
import { UpdateMatchDto } from '../dto/match-dto';
import {
  AddGoalDto,
  AddCardDto,
  UpdateResultDto,
} from '../dto/match-details.dto';
import { MatchViewDto } from './view-dto/match.view-dto';

@Controller('matches')
export class MatchController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get(':id')
  async getMatch(@Param('id') id: string): Promise<MatchViewDto> {
    return this.commandBus.execute(new GetMatchCommand(id));
  }

  @Put(':id')
  async updateMatch(
    @Param('id') id: string,
    @Body() dto: UpdateMatchDto,
  ): Promise<MatchViewDto> {
    return this.commandBus.execute(new UpdateMatchCommand(id, dto));
  }

  @Delete(':id')
  async deleteMatch(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteMatchCommand(id));
  }

  @Post(':id/goals')
  async addGoal(
    @Param('id') id: string,
    @Body() dto: AddGoalDto,
  ): Promise<MatchViewDto> {
    return this.commandBus.execute(new AddGoalToMatchCommand(id, dto));
  }

  @Post(':id/cards')
  async addCard(
    @Param('id') id: string,
    @Body() dto: AddCardDto,
  ): Promise<MatchViewDto> {
    return this.commandBus.execute(new AddCardToMatchCommand(id, dto));
  }

  @Put(':id/result')
  async updateResult(
    @Param('id') id: string,
    @Body() dto: UpdateResultDto,
  ): Promise<MatchViewDto> {
    return this.commandBus.execute(new UpdateMatchResultCommand(id, dto));
  }
}
