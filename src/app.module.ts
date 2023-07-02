import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Module } from '@nestjs/common';
import { KnexModule } from 'nestjs-knex';
import { getDBConfiguration } from 'config/database';
import { DosisHistoryModule } from './dosis-history/dosis-history.module';
import { HueApiModule } from './hue-api/hue-api.module';

@Module({
  imports: [
    KnexModule.forRootAsync({ useFactory: getDBConfiguration }),
    DosisHistoryModule,
    HueApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
