import { IsBoolean, IsNotEmpty } from 'class-validator';

export class SwitchLightDTO {
  /**
   * Either switch "on" or "off" the light
   */
  @IsNotEmpty()
  @IsBoolean()
  readonly action: boolean;
}
