import {
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Shift } from '../types/enums';

export class CreateDosisHistoryDTO {
  /**
   * The date of the administration of the dosis
   */
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly date: string;

  /**
   * The shift of the administration of the dosis (day or night)
   */
  @IsEnum(Shift)
  readonly shift: Shift;

  /**
   * The date locale string of the administration of the dosis
   */
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly inyectionDate: string;

  /**
   * The time of the administration of the dosis
   */
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly inyectionTime: string;

  /**
   * If the dosis could be administrated successfully or not
   */
  @IsNotEmpty()
  @IsBoolean()
  readonly success: boolean;
}
