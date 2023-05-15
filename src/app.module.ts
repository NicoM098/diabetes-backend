import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { getDBConfiguration } from 'config/database';
import { DosisHistoryModule } from './dosis-history/dosis-history.module';

@Module({
  imports: [
    KnexModule.forRootAsync({ useFactory: getDBConfiguration }),
    DosisHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
