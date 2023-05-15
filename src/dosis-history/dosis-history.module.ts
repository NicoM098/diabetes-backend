import { Module } from '@nestjs/common';
import { DosisHistoryController } from './controllers/dosis-history.controller';
import { DosisHistoryService } from './services/dosis-history.service';

@Module({
  controllers: [DosisHistoryController],
  providers: [DosisHistoryService],
})
export class DosisHistoryModule {}
