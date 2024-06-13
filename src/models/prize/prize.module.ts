import { Module } from '@nestjs/common';
import { PrizeService } from './service/prize.service';
import { PrizeController } from './controllers/prize.controller';

@Module({
  controllers: [PrizeController],
  providers: [PrizeService],
})
export class PrizeModule {}
