import { Module } from '@nestjs/common';
import { ResultsService } from './services/results.service';
import { ResultsController } from './controllers/results.controller';

@Module({
  controllers: [ResultsController],
  providers: [ResultsService],
})
export class ResultsModule {}
