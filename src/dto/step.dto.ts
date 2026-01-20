import { IsInt, IsOptional, IsString } from 'class-validator';

export class StepDto {
  @IsInt()
  andar: number;

  @IsInt()
  posicao: number;

  @IsOptional()
  @IsString()
  movimento?: string;
}