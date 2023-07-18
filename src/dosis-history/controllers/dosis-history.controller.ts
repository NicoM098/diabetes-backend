import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { DosisHistoryService } from '../services/dosis-history.service';
import { CreateDosisHistoryDTO } from '../dtos/create-dosis-history.dto';

@Controller('/dosis-history')
export class DosisHistoryController {
  constructor(private readonly dosisHistoryService: DosisHistoryService) {}

  @Get('')
  async getAll(@Res() Response, @Query('month') month: string) {
    try {
      console.group('[start] Dosis History - getAll');

      const resp = await this.dosisHistoryService.getDosisHistory(month);

      Response.status(HttpStatus.OK).send({
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
      console.log('[end] Dosis History - getAll');
    }
  }

  @Get('check-dosis/:shift')
  async checkDosis(@Res() Response, @Param('shift') shift: string) {
    try {
      console.group('[start] Dosis History - checkDosis');

      const resp = await this.dosisHistoryService.checkRegisteredDosis(shift);

      Response.status(HttpStatus.OK).send({
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
      console.log('[end] Dosis History - checkDosis');
    }
  }

  @Post('')
  async create(
    @Res() Response,
    @Body() createDosisHistoryDTO: CreateDosisHistoryDTO,
  ) {
    try {
      console.group('[start] Dosis History - create');

      const resp = await this.dosisHistoryService.createDosisHistory(
        createDosisHistoryDTO,
      );

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
      console.log('[end] Dosis History - create');
    }
  }
}
