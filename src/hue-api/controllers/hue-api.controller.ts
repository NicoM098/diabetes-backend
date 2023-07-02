import { Body, Controller, HttpStatus, Put, Res } from '@nestjs/common';
import { SwitchLightDTO } from '../dtos/switch-light.dto';
import { HueApiService } from '../services/hue-api.service';

@Controller('/hue-bridge')
export class HueApiController {
  constructor(private readonly hueApiService: HueApiService) {}

  @Put('/light')
  async switchLight(@Res() Response, @Body() switchLightDTO: SwitchLightDTO) {
    try {
      const { action } = switchLightDTO;
      console.group(`[start] Hue API - switchLight: ${action ? 'on' : 'off'}`);

      const resp = await this.hueApiService.switchLight(action);

      Response.status(HttpStatus.CREATED).send({
        status: 'success',
        data: resp,
      });
    } catch (error) {
      Response.status(error?.status || HttpStatus.INTERNAL_SERVER_ERROR).send({
        code: error?.response?.code || '',
        detail: error?.response?.detail || 'Unknown Error',
      });
    } finally {
      console.groupEnd();
      console.log('[end] Hue API - switchLight');
    }
  }
}
