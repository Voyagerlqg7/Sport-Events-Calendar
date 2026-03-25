import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from '../domain/cards.entity';

@Injectable()
export class CardRepository {
  constructor(
    @InjectRepository(Card)
    private readonly cardRepo: Repository<Card>,
  ) {}
  async findById(id: string): Promise<Card | null> {
    return this.cardRepo.findOne({
      where: { id },
    });
  }
  async save(card: Card): Promise<Card> {
    return this.cardRepo.save(card);
  }
}
