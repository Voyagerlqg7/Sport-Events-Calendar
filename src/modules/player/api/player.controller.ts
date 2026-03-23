import {
  Controller,
  Get,
  Put,
  Post,
  Delete,
  Param,
  HttpCode,
  HttpStatus,
  Query,
  Body,
  Injectable,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';

@Controller('players')
export class PlayerController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  async getAllPlayers() {}

  @Get(':id')
  async getPlayerById() {}

  @Post()
  async createPlayer() {}

  @Put(':id')
  async updatePlayer() {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deletePlayer() {}
}
