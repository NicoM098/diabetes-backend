import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HueApiController } from './controllers/hue-api.controller';
import { HueApiService } from './services/hue-api.service';

@Module({
  imports: [HttpModule],
  controllers: [HueApiController],
  providers: [HueApiService],
})
export class HueApiModule {}
