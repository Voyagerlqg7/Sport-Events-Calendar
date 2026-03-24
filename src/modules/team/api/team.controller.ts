import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Body,
  Param,
  Query,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateTeamCommand } from '../application/CRUD_UseCases/createTeam';
import { GetTeamCommand } from '../application/CRUD_UseCases/getTeam';
import { UpdateTeamCommand } from '../application/CRUD_UseCases/updateTeam';
import { DeleteTeamCommand } from '../application/CRUD_UseCases/deleteTeam';
import { CreateTeamsDto, UpdateTeamDto } from '../dto/teamDto';
import { TeamViewDto } from './view-dto/team.view-dto';

@Controller('teams')
export class TeamController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /*@Get()
  async getAllTeams(
    @Query('countryCode') countryCode?: string,
    @Query('search') search?: string,
  ): Promise<TeamViewDto[]> {
    //TODO: Query Repo
  }*/

  @Get(':id')
  async getTeam(@Param('id') id: string): Promise<TeamViewDto> {
    return this.commandBus.execute(new GetTeamCommand(id));
  }

  @Post()
  async createTeam(@Body() dto: CreateTeamsDto): Promise<TeamViewDto[]> {
    return this.commandBus.execute(new CreateTeamCommand(dto));
  }

  @Put(':id')
  async updateTeam(
    @Param('id') id: string,
    @Body() dto: UpdateTeamDto,
  ): Promise<TeamViewDto> {
    return this.commandBus.execute(new UpdateTeamCommand(id, dto));
  }

  @Delete(':id')
  async deleteTeam(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteTeamCommand(id));
  }
}
