import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { CreateDosisHistoryDTO } from '../dtos/create-dosis-history.dto';

@Injectable()
export class DosisHistoryService {
  constructor(
    @InjectKnex()
    private readonly knex: Knex,
  ) {}

  /**
   * Retrieves all dosis administrated
   */
  async getDosisHistory(month: string) {
    try {
      const dosisHistory = await this.knex('dosis_history')
        .select(
          'inyection_date',
          this.knex.raw(
            "MAX(CASE WHEN shift = 'Day' THEN inyection_time END) AS day_inyection_time",
          ),
          this.knex.raw(
            "bool_or(CASE WHEN shift = 'Day' THEN success END) AS day_success",
          ),
          this.knex.raw(
            "MAX(CASE WHEN shift = 'Night' THEN inyection_time END) AS night_inyection_time",
          ),
          this.knex.raw(
            "bool_or(CASE WHEN shift = 'Night' THEN success END) AS night_success",
          ),
        )
        .groupBy('inyection_date')
        .modify(function (queryBuilder) {
          // Filters results by a certain month
          month &&
            queryBuilder.whereRaw('extract(month from date) = ?', [month]);
        })
        .orderBy('inyection_date', 'asc')
        .catch(error => {
          throw new HttpException(
            {
              code: 'error_obtaining_dosis_history',
              detail: `An error has ocurred while obtaining dosis history:  ${error.message}`,
            },
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
        });

      // Sorts the dosis history by date (asc)
      const sortedDosisHistory = dosisHistory.sort((a, b) => {
        const dateA = new Date(a.inyection_date.split('/').reverse().join('/'));
        const dateB = new Date(b.inyection_date.split('/').reverse().join('/'));
        return dateA.getTime() - dateB.getTime();
      });

      return sortedDosisHistory;
    } catch (err) {
      console.log(`[error] getDosisHistory ~ `, err);
      throw new HttpException(
        {
          code: err?.response?.code || '',
          detail: err?.response?.detail || err,
        },
        err?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Creates a dosis history when the dosis was administrated
   * @param payload - All the necessary data to create the dosis history, of type CreateDosisHistoryDTO
   * @returns The created dosis history
   */
  async createDosisHistory(payload: CreateDosisHistoryDTO) {
    try {
      const { date, shift, inyectionDate, inyectionTime, success } = payload;

      // Creation of the dosis history...
      const [dosisHistory] = await this.knex
        .table('dosis_history')
        .insert({
          date,
          shift,
          inyection_date: inyectionDate
            ? inyectionDate
            : new Date().toLocaleDateString(),
          inyection_time: inyectionTime
            ? inyectionTime
            : new Date().toLocaleTimeString(),
          success,
        })
        .returning('*')
        .onConflict(['shift', 'inyection_date'])
        .merge();

      console.log(
        `Dosis History created successfully with ID: ${dosisHistory.id}`,
      );

      return dosisHistory;
    } catch (err) {
      console.log(`[error] createDosisHistory ~ `, err);
      throw new HttpException(
        {
          code: err?.response?.code || '',
          detail: err?.response?.detail || err,
        },
        err?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
