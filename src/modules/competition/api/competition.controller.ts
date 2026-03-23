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

@Controller('competition')
export class CompetitionController {
  constructor(private readonly commandBus: CommandBus) {}

  @Get()
  async getAllCompetitions() {}

  @Get(':id')
  async getCompetitionsById() {}

  @Post()
  async createCompetition() {}

  @Put(':id')
  async updateCompetition() {}

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteCompetition() {}
}
