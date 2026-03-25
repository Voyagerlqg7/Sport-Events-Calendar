import { Module } from '@nestjs/common';
import { CompetitionModule } from './competition/competition.module';
import { StageModule } from './stage/stage.module';
import { MatchModule } from './match/match.module';
import { TeamModule } from './team/team.module';
import { PlayerModule } from './player/player.module';
import { ResultModule } from './result/result.module';
import { GoalModule } from './goal/goal.module';
import { CardModule } from './cards/cards.module';

@Module({
  imports: [
    CompetitionModule,
    StageModule,
    MatchModule,
    TeamModule,
    PlayerModule,
    ResultModule,
    GoalModule,
    CardModule,
  ],
  exports: [
    CompetitionModule,
    StageModule,
    MatchModule,
    TeamModule,
    PlayerModule,
    ResultModule,
    GoalModule,
    CardModule,
  ],
})
export class SportsEventsModule {}
