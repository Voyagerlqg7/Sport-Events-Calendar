import { Controller, Get, Put, Delete, Body, Param, Query} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { GetMatchCommand } from '../application/CRUD_UseCases/getMatch';
import { UpdateMatchCommand } from '../application/CRUD_UseCases/updateMatch';
import { DeleteMatchCommand } from '../application/CRUD_UseCases/deleteMatch';
import { UpdateMatchDto } from '../dto/matchDto';
import { MatchViewDto } from './view-dto/match.view-dto';
//import { BaseQueryParams } from '../../../core/dto/base.query-params.input-dto';
//import { PaginatedViewDto } from '../../../core/dto/base.paginated.view-dto';

@Controller('matches')
export class MatchController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /*@Get()
  async getAllMatches(
    @Query() query: BaseQueryParams,
  ): Promise<PaginatedViewDto<MatchViewDto[]>> {

  }*/

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
}
