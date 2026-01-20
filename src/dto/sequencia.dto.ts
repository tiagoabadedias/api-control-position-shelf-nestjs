import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { StepDto } from './step.dto';

export class SequenciaDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => StepDto)
  passos: StepDto[];
}