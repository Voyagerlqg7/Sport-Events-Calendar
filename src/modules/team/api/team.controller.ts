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

@Controller('teams')
export class TeamController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  async getAllTeams() {}

  @Get(':id')
  async getTeamById() {}

  @Post()
  async createTeam() {}

  @Put(':id')
  async updateTeam() {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTeam() {}
}
