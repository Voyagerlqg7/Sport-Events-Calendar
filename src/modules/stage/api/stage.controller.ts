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
import { GetStageCommand } from '../application/CRUD_UseCases/getStage';
import { UpdateStageCommand } from '../application/CRUD_UseCases/updateStage';
import { DeleteStageCommand } from '../application/CRUD_UseCases/deleteStage';
import { UpdateStageDto } from '../dto/stageDto';

import { StageViewDto } from './view-dto/stage.view-dto';

@Controller('stages')
export class StageController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  /*@Get()
  async getAllStages(
    @Query('competitionId') competitionId?: string,
  ): Promise<StageViewDto[]> {
    //TODO: Query repo
  }*/

  @Get(':id')
  async getStage(@Param('id') id: string): Promise<StageViewDto> {
    return this.commandBus.execute(new GetStageCommand(id));
  }

  @Put(':id')
  async updateStage(
    @Param('id') id: string,
    @Body() dto: UpdateStageDto,
  ): Promise<StageViewDto> {
    return this.commandBus.execute(new UpdateStageCommand(id, dto));
  }

  @Delete(':id')
  async deleteStage(@Param('id') id: string): Promise<void> {
    return this.commandBus.execute(new DeleteStageCommand(id));
  }
}
