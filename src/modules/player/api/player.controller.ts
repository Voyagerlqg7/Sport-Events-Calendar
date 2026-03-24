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
import { CreatePlayerCommand } from '../application/CRUD_UseCases/createPlayer';
import { UpdatePlayerCommand } from '../application/CRUD_UseCases/updatePlayer';
import { DeletePlayerCommand } from '../application/CRUD_UseCases/deletePlayer';
import { GetPlayerCommand } from '../application/CRUD_UseCases/getPlayer';
import { UpdatePlayerDto, CreatePlayersDto } from '../dto/playerDto';
import { PlayerViewDto } from './view-dto/player.view-dto';

@Controller('players')
export class PlayerController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Get()
  async getAllPlayers(
    @Query('teamId') teamId?: string,
    @Query('search') search?: string,
    @Query('includeStats') includeStats?: string,
  ): Promise<PlayerViewDto[]> {
    return this.queryBus
      .execute
      //TODO: Query repo
      ();
  }

  @Get(':id')
  async getPlayer(
    @Param('id') id: string,
    @Query('includeStats') includeStats?: string,
  ): Promise<PlayerViewDto> {
    return this.commandBus.execute(
      new GetPlayerCommand(id, includeStats === 'true'),
    );
  }

  @Post()
  async createPlayer(@Body() dto: CreatePlayersDto): Promise<PlayerViewDto[]> {
    return this.commandBus.execute(new CreatePlayerCommand(dto));
  }

  @Put(':id')
  async updatePlayer(
    @Param('id') id: string,
    @Body() dto: UpdatePlayerDto,
  ): Promise<PlayerViewDto> {
    return this.commandBus.execute(new UpdatePlayerCommand(id, dto));
  }

  @Delete(':id')
  async deletePlayer(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeletePlayerCommand(id));
  }
}
