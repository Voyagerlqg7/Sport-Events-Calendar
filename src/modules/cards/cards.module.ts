import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CqrsModule } from '@nestjs/cqrs';
import { Card } from './domain/cards.entity';
import { CardRepository } from './infrastructure/card.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Card]), CqrsModule],
  controllers: [],
  providers: [CardRepository],
  exports: [CardRepository],
})
export class CardModule {}
